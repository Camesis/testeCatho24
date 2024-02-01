import { OK, NOT_FOUND, BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status';
import { Request, Response } from 'express';
import SearchCandidateBySkillController from '../../../src/application/controllers/SearchCandidateBySkillController';
import { faker } from '@faker-js/faker';

const mockSearchUseCase = {
    execute: jest.fn(),
};

const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

describe('SearchCandidateBySkillController', () => {
    const searchCandidateBySkillController = new SearchCandidateBySkillController(mockSearchUseCase);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve devolver um candidato quando as habilidades são fornecidas', async () => {
        const mockRequest = { query: { skills: 'JavaScript,Node.js' } } as unknown as Request;
        const expectedCandidate = {
            _id: faker.string.uuid(),
            name: faker.string.alpha(),
            skills: ['JavaScript', 'Node.js'],
        };

        mockSearchUseCase.execute.mockResolvedValue(expectedCandidate);

        await searchCandidateBySkillController.execute(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(OK);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedCandidate);
        expect(mockSearchUseCase.execute).toHaveBeenCalledWith(['JavaScript', 'Node.js']);
    });

    it('deve retornar o status 400 com uma mensagem de erro quando as habilidades não são fornecidas', async () => {
        const mockRequest = { query: {} } as Request;

        await searchCandidateBySkillController.execute(mockRequest, mockResponse);

        expect(mockResponse.status).toHaveBeenCalledWith(BAD_REQUEST);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Lista de habilidades vazia.' });
        expect(mockSearchUseCase.execute).not.toHaveBeenCalled();
    });

    it('deve retornar o status 404 com uma mensagem de erro quando nenhum candidato for encontrado', async () => {
        const mockRequest = { query: { skills: 'Java,C++' } } as unknown as Request;
        mockSearchUseCase.execute.mockResolvedValue(null);

        await searchCandidateBySkillController.execute(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(NOT_FOUND);
        expect(mockResponse.json).toHaveBeenCalledWith({
            error: 'Nenhum candidato encontrado com as habilidades fornecidas.',
        });
        expect(mockSearchUseCase.execute).toHaveBeenCalledWith(['Java', 'C++']);
    });

    it('deve tratar erros e retornar o status 500 com uma mensagem de erro', async () => {
        const mockRequest = { query: { skills: 'JavaScript,Node.js' } } as unknown as Request;
        const error = new Error('Search failed');
        mockSearchUseCase.execute.mockRejectedValue(error);

        await searchCandidateBySkillController.execute(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Falha ao buscar candidatos' });
        expect(mockSearchUseCase.execute).toHaveBeenCalledWith(['JavaScript', 'Node.js']);
    });
});
