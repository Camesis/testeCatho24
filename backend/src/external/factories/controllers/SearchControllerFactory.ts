import SearchCandidateBySkillController from "../../../application/controllers/SearchCandidateBySkillController";
import { SearchUseCaseFactory } from "../useCases/SearchUseCaseFactory";

export const SearchCandidateControllerFactory = (): SearchCandidateBySkillController => {
  const useCase = SearchUseCaseFactory();

  return new SearchCandidateBySkillController(useCase)
}
