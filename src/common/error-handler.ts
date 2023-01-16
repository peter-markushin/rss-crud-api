export class ErrorHandler {
    static async handle(error: Error): Promise<void> {
        /* eslint-disable no-console */
        console.error(`[${new Date().toISOString()}]: ${error}`);
    }
}
