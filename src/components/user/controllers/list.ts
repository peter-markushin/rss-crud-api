import { User } from '../models';
import { ControllerBase } from '../../../common/controller.base';
import { Request } from '../../../common/http/request';
import { Response } from '../../../common/http/response';

export class List extends ControllerBase<User> {
    // @ts-ignore
    handle = async (request: Request, response: Response): Promise<void> => {
        response.json(await this.repository.findAll());
    };
}
