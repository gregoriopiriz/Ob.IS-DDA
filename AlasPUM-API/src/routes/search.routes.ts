import { Router, Request, Response } from 'express';

import { searchFlight } from '../controllers/search.controller';

const router = Router();

router.post('/searchFlight', searchFlight);


export default router;