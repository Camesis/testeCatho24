import { object, string } from 'yup';

const SearchCandidateSchema = object({
    query: object({
        skills: string().required()
    })
});

export default SearchCandidateSchema