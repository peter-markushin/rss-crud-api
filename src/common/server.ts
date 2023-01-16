import { createServer } from 'http';
import { cpus } from 'os';
import cluster from 'node:cluster';
import * as http from 'http';
import * as url from 'url';
import { router } from './router';
import { register as registerUserModule } from '../components/user';
import { Request } from './http/request';
import { Response } from './http/response';
import { ApplicationError } from './errors/application-error';
import { NotFound } from './errors/not-found';
import { InternalServerError } from './errors/internalServerError';
import { Repository } from '../components/user/repository';
import { MemoryStore } from './data-store/memory-store';

const cpusCount = cpus().length;
let currentRequestNum = 0;
const getNextPort = (port: number): number => {
    currentRequestNum = currentRequestNum === cpusCount ? 1 : currentRequestNum + 1;

    return port + currentRequestNum;
};

const startMasterDb = (): void => {
    const userRepository = new Repository(new MemoryStore());

    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const id in cluster.workers) {
        const worker = cluster.workers[id]!;

        worker.on('message', async (message) => {
            // @ts-ignore
            if (typeof userRepository[message.method] === 'function') {
                const parameters = message.parameters ?? [];
                // @ts-ignore
                const result = await userRepository[message.method](...parameters);

                worker.send({ method: message.method, data: result });
            }
        });
    }
};

const createLoadBalanser = (port: number): void => {
    // eslint-disable-next-line no-console
    console.debug(`Start proxy on port ${port}`);
    http.createServer((req, res) => {
        const nextPortForLoadBalanceRequest = getNextPort(port);

        if (!req.url) {
            throw new Error();
        }

        const options = {
            ...url.parse(req.url),
            port: nextPortForLoadBalanceRequest,
            headers: req.headers,
            method: req.method,
        };

        req.pipe(
            http.request(options, (response) => {
                res.writeHead(response.statusCode!, response.headers);
                response.pipe(res);
            }),
        );
    }).listen(port);
};

function startAppServer(port: number, isClusterMode: boolean): void {
    // eslint-disable-next-line no-console
    console.debug(`Start server on port ${port}`);
    registerUserModule(router, isClusterMode);

    const server = createServer(
        {
            IncomingMessage: Request,
            ServerResponse: Response,
        },
        async (request: Request, response: Response) => {
            const routeExists = router.resolve(request);

            try {
                if (!routeExists) {
                    throw new NotFound();
                }

                await request.setBody();

                await request.route?.controller.handle(request, response);
            } catch (error: unknown) {
                let responseError: ApplicationError;

                if (error instanceof ApplicationError) {
                    responseError = error;
                } else {
                    // eslint-disable-next-line no-console
                    console.error(error);
                    responseError = new InternalServerError();
                }

                response.json({ error: responseError.message }, responseError.statusCode);
            }
            response.end();
        },
    );
    server.listen(port);
}

export const startServer = async (isClusterMode: boolean, basePort: number): Promise<void> => {
    if (isClusterMode) {
        if (cluster.isPrimary) {
            for (let i = 0; i < cpusCount; i += 1) {
                cluster.fork();
            }

            cluster.on('exit', () => {
                cluster.fork();
            });

            startMasterDb();
            createLoadBalanser(basePort);
        } else {
            const port = basePort + cluster.worker!.id;
            startAppServer(port, true);
        }
    } else {
        startAppServer(basePort, false);
    }
};
