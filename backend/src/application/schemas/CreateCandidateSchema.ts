import { object, string, array } from 'yup';

const CreateCandidateSchema = object({
    body: object({
        name: string().required(),
        skills: array().of(string())
    }),
});

export default CreateCandidateSchema