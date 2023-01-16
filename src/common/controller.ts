import { IncomingMessage, ServerResponse } from 'http';

export interface Controller {
    handle(request: IncomingMessage, response: ServerResponse): Promise<void>;
}
