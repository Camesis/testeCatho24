import { CandidateInterface } from "../../domain/schemas/Candidate";

export interface SearchUseCaseInterface {
  execute(skills: string[]): Promise<CandidateInterface | null>;
}