import { MemoryStore } from '../../../../src/common/data-store/memory-store';
import { Repository } from '../../../../src/components/user/repository';
import { User } from '../../../../src/components/user/models';
import { UserDto } from '../../../../src/components/user/dto';

describe('Repository with inmemory db', () => {
    it('creates user with valid data', async () => {
        const store = new MemoryStore<User>();
        const repository = new Repository(store);

        const user = await repository.create({
            id: '1',
            username: 'John',
            age: 12,
            hobbies: ['xxx'],
        });

        expect(user.username).toBe('John');
        expect(user.age).toBe(12);

        const allUsers = await repository.findAll();
        expect(allUsers.length).toBe(1);
        expect(allUsers[0]!.username).toBe('John');
    });

    it('updates user', async () => {
        const store = new MemoryStore<User>();
        const repository = new Repository(store);

        await repository.create({
            id: '1',
            username: 'John',
            age: 12,
            hobbies: ['xxx'],
        });

        const user = await repository.update('1', {
            username: 'Bill',
            age: 11,
            hobbies: ['hacker'],
        } as UserDto);

        expect(user.username).toBe('Bill');
        expect(user.age).toBe(11);

        const allUsers = await repository.findAll();
        expect(allUsers.length).toBe(1);
        expect(allUsers[0]!.username).toBe('Bill');
    });
});
