import { ApplicationError } from './application-error';

export class InternalServerError extends ApplicationError {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor() {
        super();
    }
}
