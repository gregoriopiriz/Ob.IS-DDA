import { Router, Request, Response } from 'express';

import { moreAndLessVoidSeats } from '../controllers/reports.controller';

const router = Router();

router.get('/moreAndLessVoidSeats', moreAndLessVoidSeats);


export default router;