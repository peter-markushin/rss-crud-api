import { Repository as EntityRepository } from '../../common/model/repository';
import { User } from './models';
import { DataStore } from '../../common/data-store/data-store';
import { UserDto } from './dto';

export class Repository implements EntityRepository<User> {
    private dataStore: DataStore<User>;

    constructor(dataStorage: DataStore<User>) {
        this.dataStore = dataStorage;
    }

    public async findAll(): Promise<User[]> {
        return await this.dataStore.getAll();
    }

    public async findById(id: string): Promise<User | undefined> {
        return await this.dataStore.get('id', id);
    }

    public async create(user: User | Record<keyof User, any>): Promise<User> {
        const userEntity = user instanceof User
            ? user
            : User.fromAny(user);

        await this.dataStore.add(userEntity);

        return userEntity;
    }

    public async update(id: string, userDto: UserDto): Promise<User> {
        return await this.dataStore.update('id', id, new User(id, userDto.username, userDto.age, userDto.hobbies));
    }

    public async delete(id: string): Promise<void> {
        await this.dataStore.remove('id', id);
    }

    public async clear(): Promise<void> {
        await this.dataStore.clear();
    }
}
