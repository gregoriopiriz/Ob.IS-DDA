import { Router, Request, Response } from 'express';

import { createPrices, logicDelete, getPricesByFlight } from '../controllers/price.controller';

const router = Router();

router.post('/', createPrices);

router.get('/');

router.get('/:flightNumber', getPricesByFlight);

router.put('/logicDelete', logicDelete);

export default router;