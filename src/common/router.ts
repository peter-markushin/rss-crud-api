import { Request } from './http/request';
import { Route } from './router.route';

export class Router {
    #base = '/api';

    #routes: Route[] = [];

    public addRoute(route: Route): void {
        this.#routes.push(route);
    }

    public resolve(request: Request): boolean {
        if (!request.url?.startsWith(this.#base) || !request.method) {
            return false;
        }

        // eslint-disable-next-line no-restricted-syntax
        for (const route of this.#routes) {
            if (!route.match(request.method, request.url)) {
                // eslint-disable-next-line no-continue
                continue;
            }

            request.route = route;

            return true;
        }

        return false;
    }
}

export const router = new Router();
