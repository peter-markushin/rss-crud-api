import { validate } from 'uuid';
import { constants } from 'node:http2';
import { Request } from '../../../common/http/request';
import { Response } from '../../../common/http/response';
import { ControllerBase } from '../../../common/controller.base';
import { BadRequest } from '../../../common/errors/bad-request';
import { NotFound } from '../../../common/errors/not-found';
import { User } from '../models';

export class Delete extends ControllerBase<User> {
    // @ts-ignore
    async handle(request: Request, response: Response): Promise<void> {
        const userId = request.route?.params?.['id'];

        if (!userId || !validate(userId)) {
            throw new BadRequest();
        }

        const user = await this.repository.findById(userId);

        if (!user) {
            throw new NotFound();
        }

        await this.repository.delete(userId);

        response.writeHead(constants.HTTP_STATUS_NO_CONTENT);
    }
}
