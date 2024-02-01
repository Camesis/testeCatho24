import { CandidateInterface } from '../../schemas/Candidate';

export default interface CandidateRepositoryInterface {
  create(data: CandidateInterface): Promise<CandidateInterface>;
  findBySkills(skills: string[]): Promise<CandidateInterface[]>;
}
