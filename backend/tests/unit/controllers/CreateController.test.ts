import { CREATED, INTERNAL_SERVER_ERROR } from 'http-status';
import { Request, Response } from 'express';
import CreateCandidateController from '../../../src/application/controllers/CreateCandidateController';
import { faker } from '@faker-js/faker';

const mockCreateUseCase = {
    execute: jest.fn(),
};
const mockResponse = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as unknown as Response;

describe('CreateCandidateController', () => {
    const createCandidateController = new CreateCandidateController(mockCreateUseCase);

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('deve criar um novo candidato e retornar o status 201 com os dados criados', async () => {
        const requestBody = {
            name: faker.string.alpha(),
            skills: ['JavaScript', 'Node.js'],
        };

        const expectedResult = {
            _id: faker.string.uuid(),
            ...requestBody,
        };

        mockCreateUseCase.execute.mockResolvedValue(expectedResult);
        const mockRequest = { body: requestBody } as Request;

        await createCandidateController.execute(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(CREATED);
        expect(mockResponse.json).toHaveBeenCalledWith(expectedResult);
        expect(mockCreateUseCase.execute).toHaveBeenCalledWith(requestBody);
    });

    it('deve tratar erros e retornar o status 500 com uma mensagem de erro', async () => {
        const requestBody = {
            name: faker.string.alpha(),
            skills: ['JavaScript', 'Node.js'],
        };

        const error = new Error('Create failed');
        mockCreateUseCase.execute.mockRejectedValue(error);
        const mockRequest = { body: requestBody } as Request;


        await createCandidateController.execute(mockRequest, mockResponse);
        expect(mockResponse.status).toHaveBeenCalledWith(INTERNAL_SERVER_ERROR);
        expect(mockResponse.json).toHaveBeenCalledWith({ error: 'Falha ao cadastrar candidato' });
        expect(mockCreateUseCase.execute).toHaveBeenCalledWith(requestBody);
    });
});
