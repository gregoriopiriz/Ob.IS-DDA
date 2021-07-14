import { Router, Request, Response } from 'express';

import { createPurchase, getPurchase, getAllPurchases } from '../controllers/purchase.controller';

const router = Router();

router.post('/createPurchase', createPurchase);

router.get('/', getAllPurchases);

export default router;