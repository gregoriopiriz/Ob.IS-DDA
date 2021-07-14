import { Router, Request, Response } from 'express';

import { signIn, signUp } from '../controllers/user.controller';

const router = Router();

router.post('/signin', signIn);

router.post('/signup', signUp);

export default router;