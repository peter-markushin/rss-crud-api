import { IncomingMessage } from 'http';
import { Route } from '../router.route';

export class Request extends IncomingMessage {
    #route: Route | undefined;

    #body: string | null = null;

    get json(): object {
        if (this.#body) {
            return JSON.parse(this.#body);
        }

        throw new Error('Request body is empty');
    }

    get route(): Route | undefined {
        return this.#route;
    }

    set route(value: Route | undefined) {
        this.#route = value;
    }

    public setBody = async (): Promise<void> => {
        const chunks: Uint8Array[] = [];

        // eslint-disable-next-line no-restricted-syntax
        for await (const chunk of this) {
            chunks.push(chunk);
        }

        this.#body = Buffer.concat(chunks).toString();
    };
}
