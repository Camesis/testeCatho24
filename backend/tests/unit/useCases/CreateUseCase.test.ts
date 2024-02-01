import { faker } from '@faker-js/faker';
import { CreateUseCaseInterface } from '../../../src/useCases/interfaces/CreateUseCase';
import CreateUseCase from '../../../src/useCases/CreateUseCase';
import { CandidateInterface } from '../../../src/domain/schemas/Candidate';
import CandidateRepositoryInterface from '../../../src/domain/repositories/interfaces/CandidateRepositoryInterface';

const mockCandidateRepository = {
    create: jest.fn(),
} as unknown as CandidateRepositoryInterface;

describe('CreateUseCase', () => {
    const createUseCase = new CreateUseCase(mockCandidateRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um novo candidato', async () => {
        const inputCandidate: CandidateInterface = {
            name: faker.string.alpha(),
            skills: ['JavaScript', 'Node.js'],
        };

        const expectedCandidate: CandidateInterface = {
            _id: faker.string.uuid(),
            ...inputCandidate,
        };

        mockCandidateRepository.create = jest.fn().mockResolvedValue(expectedCandidate);
        const result = await createUseCase.execute(inputCandidate);
        expect(result).toEqual(expectedCandidate);
        expect(mockCandidateRepository.create).toHaveBeenCalledWith(inputCandidate);
    });

    it('deve gerar um erro se a criação do candidato falhar', async () => {
        const inputCandidate: CandidateInterface = {
            name: 'John Doe',
            skills: ['JavaScript', 'Node.js'],
        };

        const error = new Error('Candidate creation failed');
        mockCandidateRepository.create = jest.fn().mockRejectedValue(error);
        await expect(createUseCase.execute(inputCandidate)).rejects.toThrow(error);
        expect(mockCandidateRepository.create).toHaveBeenCalledWith(inputCandidate);
    });
});
