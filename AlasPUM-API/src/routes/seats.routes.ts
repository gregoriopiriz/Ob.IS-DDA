import { Router, Request, Response } from 'express';

import {getSeatsByPlaneId, getAllSeat} from '../controllers/seat.controller';

const router = Router();

router.get('/', getAllSeat);

router.get('/getQuantityByPlaneID/:id', getSeatsByPlaneId);

router.post('/');

router.put('/{id}');

router.delete('/{id}');

export default router;