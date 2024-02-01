import { OK, NOT_FOUND, BAD_REQUEST } from "http-status";
import { Request, Response } from 'express';
import { SearchUseCaseInterface } from "../../useCases/interfaces/SearchUseCase";

export default class SearchCandidateBySkillController {
    constructor(private searchUseCase: SearchUseCaseInterface) { }

    public execute = async (request: Request, response: Response) => {
        try {

            const skillsParam = request.query.skills;
            const requiredSkills = skillsParam?.toString().split(',');

            if (!requiredSkills || requiredSkills.length === 0) {
                return response.status(BAD_REQUEST).json({ error: 'Lista de habilidades vazia.' });
            }

            const candidate = await this.searchUseCase.execute(requiredSkills);        
            
            if (!candidate) {
                return response.status(NOT_FOUND).json({ error: 'Nenhum candidato encontrado com as habilidades fornecidas.' });
            }    
                
            return response.status(OK).json(candidate);
        } catch (err: any) {
            console.error('Falha ao buscar candidatos', err);
            return response.status(500).json({ error: 'Falha ao buscar candidatos' });
        }
    };
}


