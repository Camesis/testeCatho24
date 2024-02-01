import CreateCandidateController from "../../../application/controllers/CreateCandidateController";
import { CreateCandidateUseCaseFactory } from "../useCases/CreateUseCaseFactory";

export const CreateCandidateControllerFactory = (): CreateCandidateController => {
  const useCase = CreateCandidateUseCaseFactory();

  return new CreateCandidateController(useCase)
}
