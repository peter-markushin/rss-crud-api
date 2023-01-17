import { constants } from 'node:http2';
import { validate } from 'uuid';
import { User } from '../models';
import { ControllerBase } from '../../../common/controller.base';
import { Request } from '../../../common/http/request';
import { Response } from '../../../common/http/response';
import { validateDto } from '../validator';
import { BadRequest } from '../../../common/errors/bad-request';
import { NotFound } from '../../../common/errors/not-found';

export class Update extends ControllerBase<User> {
    // @ts-ignore
    handle = async (request: Request, response: Response): Promise<void> => {
        const userId = request.route?.params?.['id'];

        if (!userId || !validate(userId)) {
            throw new BadRequest();
        }

        if (!await this.repository.findById(userId)) {
            throw new NotFound();
        }

        const userDto = request.json;

        validateDto(userDto);

        const user = await this.repository.update(userId, userDto);

        response.json(user, constants.HTTP_STATUS_CREATED);
    };
}
