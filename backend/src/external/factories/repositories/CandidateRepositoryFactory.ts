import { model, Model } from 'mongoose';
import CandidateRepositoryInterface from '../../../domain/repositories/interfaces/CandidateRepositoryInterface';
import { CandidateInterface, CandidateSchema } from '../../../domain/schemas/Candidate';
import CandidateRepository from '../../../domain/repositories/Candidates';


export const CandidateRepositoryFactory = (): CandidateRepositoryInterface => {
    const modelCandidate: Model<CandidateInterface> = model<CandidateInterface>('Candidate', CandidateSchema);

    return new CandidateRepository(modelCandidate);
}
