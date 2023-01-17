import { Entity } from '../../common/model/entity';

export class User extends Entity {
    username: string;

    age: number;

    hobbies: string[];

    constructor(
        id: string,
        username: string,
        age: number,
        hobbies: string[],
    ) {
        super({ id });

        this.username = username;
        this.age = age;
        this.hobbies = hobbies;
    }

    public static override fromAny(obj: Record<keyof User, any>): User {
        return new User(obj.id, obj.username, obj.age, obj.hobbies);
    }
}
