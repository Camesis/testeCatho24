import { CREATED } from "http-status";
import { Request, Response } from 'express';
import { CreateUseCaseInterface } from "../../useCases/interfaces/CreateUseCase";

export default class CreateCandidateController {
    constructor(private createUseCase: CreateUseCaseInterface) { }

    public execute = async (request: Request, response: Response) => {
        try {
            const data = await this.createUseCase.execute(request.body);
            return response.status(CREATED).json(data);
        } catch (err: any) {
            console.error('Falha ao cadastrar candidato', err);
            return response.status(500).json({ error: 'Falha ao cadastrar candidato' });
        }
    };
}