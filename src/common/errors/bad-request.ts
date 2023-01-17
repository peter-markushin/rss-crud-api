import { constants } from 'node:http2';
import { ApplicationError } from './application-error';

export class BadRequest extends ApplicationError {
    public override readonly statusCode: number = constants.HTTP_STATUS_BAD_REQUEST;

    constructor() {
        super('Bad Request');
    }
}
