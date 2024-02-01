import CandidateRepositoryInterface from "../domain/repositories/interfaces/CandidateRepositoryInterface";
import { CandidateInterface } from "../domain/schemas/Candidate";
import { SearchUseCaseInterface } from "./interfaces/SearchUseCase";

export default class SearchUseCase implements SearchUseCaseInterface {
    constructor(
        private candidateRepository: CandidateRepositoryInterface,
    ) { }

    async execute(skills: string[]): Promise<CandidateInterface | null> {
        const candidates = await this.candidateRepository.findBySkills(skills);
        if (!candidates.length) return null;

        return this.rankCandidates(candidates, skills);
    }

    private async rankCandidates(candidates: CandidateInterface[], requiredSkills: string[]): Promise<CandidateInterface> {
        let bestCandidate: CandidateInterface = candidates[0];
        let bestCandidateScore = 1;

        for (const candidate of candidates) {
            const concArray = [... new Set(requiredSkills.concat(...candidate.skills))]
            const tempScore = candidate.skills.length - (concArray.length - requiredSkills.length)

            if (tempScore === requiredSkills.length) return candidate

            if (tempScore > bestCandidateScore) {
                bestCandidateScore = tempScore;
                bestCandidate = candidate;
            }
        }

        return bestCandidate;
    }
}
