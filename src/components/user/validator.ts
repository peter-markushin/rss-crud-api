import { UserDto } from './dto';
import { BadRequest } from '../../common/errors/bad-request';

const rules: Record<string, string> = {
    username: 'string',
    age: 'number',
    hobbies: 'object',
};

function checkDtoKeysMatch(dto: Record<string, any>): boolean {
    const ruleKeys = Object.keys(rules);
    const dtoKeys = Object.keys(dto);

    if (dtoKeys.length !== ruleKeys.length) {
        return false;
    }

    return dtoKeys.filter((key) => !ruleKeys.includes(key)).length === 0;
}

export function validateDto(dto: Record<string, any>): asserts dto is UserDto {
    let hasErrors: boolean = !checkDtoKeysMatch(dto);

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(dto)) {
        if (typeof value !== rules[key]) {
            hasErrors = true;
        }
    }

    // eslint-disable-next-line no-restricted-syntax
    for (const value in dto['hobbies']) {
        if (typeof value !== 'string') {
            hasErrors = true;
        }
    }

    if (hasErrors) {
        throw new BadRequest();
    }
}
