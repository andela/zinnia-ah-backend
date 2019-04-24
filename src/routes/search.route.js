import { Router } from 'express';

import customSearch from './controllers/search.controller';

const searchRouter = Router();
searchRouter.get('/', customSearch);

export default searchRouter;
