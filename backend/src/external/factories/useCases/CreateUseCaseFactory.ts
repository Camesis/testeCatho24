import CandidateRepositoryInterface from "../../../domain/repositories/interfaces/CandidateRepositoryInterface";
import CreateUseCase from "../../../useCases/CreateUseCase";
import { CandidateRepositoryFactory } from "../repositories/CandidateRepositoryFactory";

export const CreateCandidateUseCaseFactory = (
  candidateRepository?: CandidateRepositoryInterface
): CreateUseCase => {
  const repository = candidateRepository ?? CandidateRepositoryFactory();

  return new CreateUseCase(repository)
}
