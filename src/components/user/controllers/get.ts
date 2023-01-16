import { validate } from 'uuid';
import { Request } from '../../../common/http/request';
import { Response } from '../../../common/http/response';
import { ControllerBase } from '../../../common/controller.base';
import { BadRequest } from '../../../common/errors/bad-request';
import { NotFound } from '../../../common/errors/not-found';
import { User } from '../models';

export class Get extends ControllerBase<User> {
    async handle(request: Request, response: Response): Promise<void> {
        const userId = request.route?.params?.['id'];

        if (!userId || !validate(userId)) {
            throw new BadRequest();
        }

        const user = await this.repository.findById(userId);

        if (!user) {
            throw new NotFound();
        }

        response.json(user);
    }
}
