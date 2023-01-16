import { IncomingMessage, ServerResponse } from 'http';
import { Controller } from './controller';
import { Repository } from './model/repository';

export abstract class ControllerBase<Type> implements Controller {
    protected repository: Repository<Type>;

    constructor(repository: Repository<Type>) {
        this.repository = repository;
    }

    abstract handle(request: IncomingMessage, response: ServerResponse): Promise<void>;
}
