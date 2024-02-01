import { CandidateInterface } from "../../domain/schemas/Candidate";

export interface CreateUseCaseInterface {
  execute(candidate: CandidateInterface): Promise<CandidateInterface>;
}