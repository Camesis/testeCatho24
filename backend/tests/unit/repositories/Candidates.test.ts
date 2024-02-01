import { Model } from 'mongoose';
import { CandidateInterface } from '../../../src/domain/schemas/Candidate';
import CandidateRepository from '../../../src/domain/repositories/Candidates'
import { faker } from '@faker-js/faker';

jest.mock('mongoose');

const mockCreate = jest.fn();
const mockFind = jest.fn();

const mockModel = {
    create: mockCreate,
    find: mockFind,
} as unknown as Model<CandidateInterface>;

describe('CandidateRepository', () => {
    const candidateRepository = new CandidateRepository(mockModel);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('create', () => {
        it('deveria criar um novo candidato', async () => {
            const inputData: CandidateInterface = {
                name: 'Jennifer',
                skills: ['JavaScript', 'Node.js'],
            };

            const expectedResult: CandidateInterface = {
                _id: faker.string.uuid(),
                ...inputData,
            };

            mockCreate.mockResolvedValue(expectedResult);

            const result = await candidateRepository.create(inputData);

            expect(result).toEqual(expectedResult);
            expect(mockCreate).toHaveBeenCalledWith(inputData);
        });

        it('deve gerar um erro se a criação falhar', async () => {
            const inputData: CandidateInterface = {
                name: 'Jennifer',
                skills: ['JavaScript', 'Node.js'],
            };

            const error = new Error('Create failed');
            mockCreate.mockRejectedValue(error);

            await expect(candidateRepository.create(inputData)).rejects.toThrow(error);
            expect(mockCreate).toHaveBeenCalledWith(inputData);
        });
    });

    describe('findBySkills', () => {
        it('deve encontrar candidatos por habilidades', async () => {
            const requiredSkills = ['JavaScript', 'Node.js'];

            const expectedResult: CandidateInterface[] = [

                { _id: faker.string.uuid(), name: 'Jennifer', skills: ['JavaScript', 'Node.js'] },
                { _id: faker.string.uuid(), name: 'Jennifer', skills: ['JavaScript', 'next'] },
            ];

            mockFind.mockResolvedValue(expectedResult);
            const result = await candidateRepository.findBySkills(requiredSkills);

            expect(result).toEqual(expectedResult);
            expect(mockFind).toHaveBeenCalledWith({
                $or: [
                    { skills: { $in: ['JavaScript'] } },
                    { skills: { $in: ['Node.js'] } },
                ],
            });
        });

        it('deve gerar um erro se findBySkills falhar', async () => {
            const requiredSkills = ['JavaScript', 'Node.js'];

            const error = new Error('Find failed');
            mockFind.mockRejectedValue(error);

            await expect(candidateRepository.findBySkills(requiredSkills)).rejects.toThrow(error);
            expect(mockFind).toHaveBeenCalledWith({
                $or: [
                    { skills: { $in: ['JavaScript'] } },
                    { skills: { $in: ['Node.js'] } },
                ],
            });
        });
    });
});
