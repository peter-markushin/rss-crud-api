import * as dotenv from 'dotenv';
import { ErrorHandler } from './common/error-handler';
import { startServer } from './common/server';

dotenv.config();

const ARG_CLUSTER_MODE = '--multi';

process.on('unhandledRejection', (error: Error) => {
    throw error;
});

process.on('uncaughtException', async (error: Error) => {
    await ErrorHandler.handle(error);
});

const main = async (args: string[]): Promise<void> => {
    if (!process.env['SERVER_PORT']) {
        throw new Error('Server port is not set');
    }

    const isClusterMode = args.includes(ARG_CLUSTER_MODE);
    const baseServerPort = parseInt(process.env['SERVER_PORT'], 10);

    return await startServer(isClusterMode, baseServerPort);
};

await main(process.argv.slice(2));
