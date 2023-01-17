import { constants } from 'node:http2';
import { ApplicationError } from './application-error';

export class NotFound extends ApplicationError {
    public override readonly statusCode: number = constants.HTTP_STATUS_NOT_FOUND;

    constructor() {
        super('Not Found');
    }
}
