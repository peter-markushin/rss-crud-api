import { RequestMethod } from './http/request-methods';
import { Controller } from './controller';

export class Route {
    #method: RequestMethod;

    #pattern: RegExp | string;

    #controller: Controller;

    private routeParams: Record<string, string> | undefined;

    constructor(
        method: RequestMethod,
        pattern: RegExp | string,
        controller: Controller,
    ) {
        this.#method = method;
        this.#pattern = pattern;
        this.#controller = controller;
    }

    get controller(): Controller {
        return this.#controller;
    }

    get params(): Record<string, string> | undefined {
        return this.routeParams;
    }

    public match(requestMethod: string, url: string): boolean {
        if (requestMethod !== this.#method.valueOf()) {
            return false;
        }

        const urlMatches = url.match(this.#pattern);

        this.routeParams = urlMatches?.groups;

        return urlMatches !== null;
    }
}
