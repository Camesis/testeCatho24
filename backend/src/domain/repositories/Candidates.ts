import { Model } from 'mongoose';
import { CandidateInterface } from '../schemas/Candidate';
import CandidateRepositoryInterface from './interfaces/CandidateRepositoryInterface';


export default class CandidateRepository implements CandidateRepositoryInterface {
    constructor(private model: Model<CandidateInterface>) { }

    async create(data: CandidateInterface): Promise<CandidateInterface> {
        try {
            const packageResult = await this.model.create(data);
            return packageResult;
        } catch (err: any) {
            throw err;
        }
    }

    async findBySkills(requiredSkills: string[]): Promise<CandidateInterface[]> {
        try {
            const conditions = requiredSkills.map((skill) => {
                return { skills: { $in: [skill] } }
            })

            const candidates = await this.model.find({
                $or: conditions
            });

            return candidates;
        } catch (err: any) {
            throw err;
        }
    }
}