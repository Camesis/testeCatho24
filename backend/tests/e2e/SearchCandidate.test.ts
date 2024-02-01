import axios from 'axios';
import { BAD_REQUEST, NOT_FOUND, OK } from 'http-status';
import { faker } from '@faker-js/faker';

const url = `http://localhost:${process.env.HOST_PORT!}`;
describe('SearchCandidate', () => {
    it('deve devolver o candidato com a pontuação mais alta com base nas habilidades fornecidas', async () => {
        const requiredSkills = [faker.word.sample(), faker.word.sample(), faker.word.sample()];
        const candidateOne = {
            name: faker.string.alpha({ length: 5 }),
            skills: [...requiredSkills.slice(0, 1)]
        }

        const candidateTwo = {
            name: faker.string.alpha({ length: 5 }),
            skills: [...requiredSkills[0]]
        }

        await axios.post(`${url}/api/candidates`, candidateOne);
        await axios.post(`${url}/api/candidates`, candidateTwo);

        const response = await axios.get(`${url}/api/candidates/search?skills=${requiredSkills.join()}`);
        expect(response.status).toBe(OK);
        expect(response.data).toHaveProperty('_id');
        expect(response.data.name).toBe(candidateOne.name);
    });

    it('deve retornar NOT FOUND quando nenhum candidato for encontrado com as habilidades fornecidas', async () => {
        const requiredSkills = ['invalidSkill'];

        const response = await axios.get(`${url}/api/candidates/search?skills=${requiredSkills.join()}`, {
            validateStatus: () => true
        });

        expect(response.status).toEqual(NOT_FOUND);
        expect(response.data.error).toEqual('Nenhum candidato encontrado com as habilidades fornecidas.');
    });

    it('deve retornar BAD REQUEST quando o parâmetro skills está vazio', async () => {
        const response = await axios.get(`${url}/api/candidates/search?skills=`, { validateStatus: () => true });

        expect(response.status).toEqual(BAD_REQUEST);
        expect(response.data.error).toEqual('query.skills is a required field')
    });
});
