import { Route } from '../../common/router.route';
import { RequestMethod } from '../../common/http/request-methods';
import { Repository } from '../../common/model/repository';
import { List } from './controllers/list';
import { User } from './models';
import { Router } from '../../common/router';
import { Get } from './controllers/get';
import { Delete } from './controllers/delete';
import { Create } from './controllers/create';
import { Update } from './controllers/update';

export const registerRoutes = async (router: Router, repository: Repository<User>): Promise<void> => {
    router.addRoute(new Route(RequestMethod.GET, '/users$', new List(repository)));
    router.addRoute(new Route(RequestMethod.POST, '/users$', new Create(repository)));
    router.addRoute(new Route(RequestMethod.GET, '/users/(?<id>[0-9A-Fa-f-]+)$', new Get(repository)));
    router.addRoute(new Route(RequestMethod.PUT, '/users/(?<id>[0-9A-Fa-f-]+)$', new Update(repository)));
    router.addRoute(new Route(RequestMethod.DELETE, '/users/(?<id>[0-9A-Fa-f-]+)$', new Delete(repository)));
};
