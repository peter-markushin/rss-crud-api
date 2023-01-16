import { createServer } from 'http';
import { router } from './router';
import { register as registerUserModule } from '../components/user';
import { Request } from './http/request';
import { Response } from './http/response';
import { ApplicationError } from './errors/application-error';
import { NotFound } from './errors/not-found';
import { InternalServerError } from './errors/internalServerError';

export const startServer = async (isClusterMode: boolean, basePort: number): Promise<void> => {
    if (isClusterMode) { /* empty */ }

    await registerUserModule(router, isClusterMode);

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
    server.listen(basePort);
};
