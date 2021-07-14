import { Router, Request, Response } from 'express';

import { createFlight, getFlight, getAllFlights, logicDelete, updateFlight } from '../controllers/flight.controller';

const router = Router();

router.get('/', getAllFlights);

router.get('/:id', getFlight);

router.post('/', createFlight);

router.put('/{id}', updateFlight);

router.put('/logicDelete', logicDelete);

export default router;