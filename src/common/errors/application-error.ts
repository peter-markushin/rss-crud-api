import { constants } from 'node:http2';

export class ApplicationError extends Error {
    public readonly statusCode: number = constants.HTTP_STATUS_INTERNAL_SERVER_ERROR;

    protected constructor(message: string = 'Internal Server Error') {
        super(message);
    }
}
