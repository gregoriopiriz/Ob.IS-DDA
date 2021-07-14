import { Router, Request, Response } from 'express';

import { pay } from '../controllers/payment.controller';

const router = Router();

router.post('/pay', pay);

export default router;