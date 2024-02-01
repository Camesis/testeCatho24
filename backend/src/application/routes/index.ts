import { Router } from 'express'
import { CreateCandidateControllerFactory } from '../../external/factories/controllers/CreateControllerFactory';
import { SearchCandidateControllerFactory } from '../../external/factories/controllers/SearchControllerFactory';
import { validate } from '../middlewares/schemaValidator';
import CreateCandidateSchema from '../schemas/CreateCandidateSchema';
import SearchCandidateSchema from '../schemas/SearchCandidateSchema';

const router = Router()

router.get('/api', (_data, response) => {
	return response.send({
		message: `Hello World`,
	});
});

router.post(
    '/api/candidates',
    validate(CreateCandidateSchema),
    CreateCandidateControllerFactory().execute,
  );

  router.get(
    '/api/candidates/search',
    validate(SearchCandidateSchema),
    SearchCandidateControllerFactory().execute,    
  
);

export default router;