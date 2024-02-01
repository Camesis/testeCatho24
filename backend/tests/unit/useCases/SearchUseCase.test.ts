import { faker } from '@faker-js/faker';
import { SearchUseCaseInterface } from '../../../src/useCases/interfaces/SearchUseCase';
import SearchUseCase from '../../../src/useCases/SearchUseCase';
import { CandidateInterface } from '../../../src/domain/schemas/Candidate';
import CandidateRepositoryInterface from '../../../src/domain/repositories/interfaces/CandidateRepositoryInterface';

const mockCandidateRepository = {
    findBySkills: jest.fn(),
} as unknown as CandidateRepositoryInterface;

describe('SearchUseCase', () => {
    const searchUseCase = new SearchUseCase(mockCandidateRepository);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve retornar um candidato com todas as habilidades', async () => {
        const requiredSkills = ['Next', 'Node.js', 'Typescript'];
        const candidates = [
            {
                name: faker.string.alpha(),
                skills: ['Node.js', 'Typescript'],
            },
            {
                name: faker.string.alpha(),
                skills: ['Next', 'Node.js', 'Typescript'],
            },
        ];

        mockCandidateRepository.findBySkills = jest.fn().mockResolvedValue(candidates);
        const result = await searchUseCase.execute(requiredSkills);
        expect(result).toEqual(candidates[1]);
        expect(mockCandidateRepository.findBySkills).toHaveBeenCalledWith(requiredSkills);
    });

    it('deve devolver o primeiro candidato quando todos os candidatos tiverem as habilidades exigidas', async () => {
        const requiredSkills = ['Next', 'Node.js', 'Typescript'];
        const candidates = [
            {
                name: faker.string.alpha(),
                skills: ['Next', 'Node.js', 'Typescript'],
            },
            {
                name: faker.string.alpha(),
                skills: ['Next', 'Node.js', 'Typescript'],
            },
        ];


        mockCandidateRepository.findBySkills = jest.fn().mockResolvedValue(candidates);
        const result = await searchUseCase.execute(requiredSkills);
        expect(result).toEqual(candidates[0]);
        expect(mockCandidateRepository.findBySkills).toHaveBeenCalledWith(requiredSkills);
    });

    it('deve devolver o primeiro candidato quando todos os candidatos tiverem as habilidades exigidas', async () => {
        const requiredSkills = ['Next', 'Node.js', 'Typescript'];
        const candidates = [
            {
                name: faker.string.alpha(),
                skills: ['Next', 'Node.js', 'Typescript'],
            },
            {
                name: faker.string.alpha(),
                skills: ['Next', 'Node.js', 'Typescript'],
            },
        ];


        mockCandidateRepository.findBySkills = jest.fn().mockResolvedValue(candidates);
        const result = await searchUseCase.execute(requiredSkills);
        expect(result).toEqual(candidates[0]);
        expect(mockCandidateRepository.findBySkills).toHaveBeenCalledWith(requiredSkills);
    });

    it('deve retornar null porque o repositório retorna um array vazio', async () => {
        const requiredSkills = ['Next', 'Node.js', 'Typescript'];

        mockCandidateRepository.findBySkills = jest.fn().mockResolvedValue([]);
        const result = await searchUseCase.execute(requiredSkills);
        expect(result).toEqual(null);
        expect(mockCandidateRepository.findBySkills).toHaveBeenCalledWith(requiredSkills);
    });

    it('deve gerar um erro se a pesquisa do candidato falhar', async () => {
        const requiredSkills = ['Next', 'Node.js', 'Typescript'];
        const error = new Error('Search candidate failed');
        mockCandidateRepository.findBySkills = jest.fn().mockRejectedValue(error);

        await expect(searchUseCase.execute(requiredSkills)).rejects.toThrow(error);
        expect(mockCandidateRepository.findBySkills).toHaveBeenCalledWith(requiredSkills);
    });
});
