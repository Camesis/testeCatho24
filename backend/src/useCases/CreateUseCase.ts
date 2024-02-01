import {  randomUUID } from "crypto";
import CandidateRepositoryInterface from "../domain/repositories/interfaces/CandidateRepositoryInterface";
import { CandidateInterface } from "../domain/schemas/Candidate";
import { CreateUseCaseInterface } from "./interfaces/CreateUseCase";

export default class CreateUseCase implements CreateUseCaseInterface {
    constructor(
        private candidateRepository: CandidateRepositoryInterface,
    ) { }

    execute(candidate: CandidateInterface): Promise<CandidateInterface> {
        candidate._id = randomUUID()
        return this.candidateRepository.create(candidate)
    }
}