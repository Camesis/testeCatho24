import axios from 'axios';
import { BAD_REQUEST, CREATED } from 'http-status';
import { faker } from '@faker-js/faker';

const url = `http://localhost:${process.env.HOST_PORT!}`;
describe('CreateCandidate', () => {
    it('deve criar um novo candidato e retornar o status 201 com os dados criados', async () => {
        const requestBody = {
            name: faker.string.alpha(),
            skills: ['nodejs', 'react'],
        };

        const response = await axios.post(`${url}/api/candidates`, requestBody);

        expect(response.status).toBe(CREATED);
        expect(response.data).toHaveProperty('_id');
        expect(response.data.name).toBe(requestBody.name);
        expect(response.data.skills).toEqual(requestBody.skills);
    });

    it('deve retornar uma solicitação incorreta porque não tem name prop', async () => {
        const requestBody = {
            skills: ['nodejs', 'react'],
        };

        const response = await axios.post(`${url}/api/candidates`, requestBody, {
            validateStatus: () => true
        });

        expect(response.status).toBe(BAD_REQUEST);
        expect(response.data.error).toEqual('body.name is a required field')
    });
});
