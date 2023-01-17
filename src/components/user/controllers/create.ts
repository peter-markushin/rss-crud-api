import { constants } from 'node:http2';
import { v4 } from 'uuid';
import { User } from '../models';
import { ControllerBase } from '../../../common/controller.base';
import { Request } from '../../../common/http/request';
import { Response } from '../../../common/http/response';
import { validateDto } from '../validator';

export class Create extends ControllerBase<User> {
    // @ts-ignore
    handle = async (request: Request, response: Response): Promise<void> => {
        const userDto = request.json;

        validateDto(userDto);

        userDto.id = v4().toString();

        const user = await this.repository.create(userDto);

        response.json(user, constants.HTTP_STATUS_CREATED);
    };
}
