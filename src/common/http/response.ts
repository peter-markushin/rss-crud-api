import { IncomingMessage, ServerResponse } from 'http';
import { constants } from 'http2';

export class Response<
    Request extends IncomingMessage = IncomingMessage,
> extends ServerResponse<Request> {
    public json(data: object, status: number = constants.HTTP_STATUS_OK) {
        this.writeHead(status, { 'Content-Type': 'application/json' });
        this.write(JSON.stringify(data));
    }
}
