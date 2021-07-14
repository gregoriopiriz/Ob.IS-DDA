import { Router, Request, Response } from 'express';

import { createTicket } from '../controllers/ticket.controller';

const router = Router();

router.post('/createTicket', createTicket);

export default router;