import CandidateRepositoryInterface from "../../../domain/repositories/interfaces/CandidateRepositoryInterface";
import SearchUseCase from "../../../useCases/SearchUseCase";
import { CandidateRepositoryFactory } from "../repositories/CandidateRepositoryFactory";

export const SearchUseCaseFactory = (
  candidateRepository?: CandidateRepositoryInterface
): SearchUseCase => {
  const repository = candidateRepository ?? CandidateRepositoryFactory();

  return new SearchUseCase(repository);
};
