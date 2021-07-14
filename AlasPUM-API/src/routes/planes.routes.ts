import { Router, Request, Response } from 'express';

import { createPlane, getAllPlane, getPlane, logicDelete, updatePlane } from '../controllers/plane.controller';

const router = Router();

router.post('/', createPlane);

router.get('/', getAllPlane);

router.get('/:id', getPlane);

router.put('/', updatePlane);

router.put('/logicDelete', logicDelete);

export default router;