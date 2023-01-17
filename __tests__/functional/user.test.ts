import supertest from 'supertest';
import { constants } from 'http2';
import { createAppServer } from '../../src/common/server';


const request = supertest(createAppServer(false));

describe('Users', () => {
    it('create, update, get, delete', async () => {
        const response1 = await request.get('/api/users');
        expect(response1.body).toHaveLength(0);

        const createUser = {
            username: 'John',
            age: 11,
            hobbies: ['xxx'],
        };

        const response2 = await request.post('/api/users').send(createUser);

        expect(response2.status).toBe(constants.HTTP_STATUS_CREATED);
        const userId = response2.body.id;


        const response3 = await request.get(`/api/users/${userId}`);
        expect(response3.body.username).toBe('John');

        const updateUser = {
            username: 'Bill',
            age: 12,
            hobbies: ['programming'],
        };

        const response4 = await request.put(`/api/users/${userId}`).send(updateUser);

        expect(response4.body).toEqual({
            id: userId,
            username: 'Bill',
            age: 12,
            hobbies: ['programming'],
        });

        await request.delete(`/api/users/${userId}`);

        const response5 = await request.get(`/api/users/${userId}`);
        expect(response5.status).toBe(constants.HTTP_STATUS_NOT_FOUND);
    });
});
