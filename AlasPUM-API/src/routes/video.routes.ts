import { Router, Request, Response } from 'express';
import {getVideo} from '../controllers/video.controller';
import path from 'path';

const router = Router();

router.get('/:id', getVideo)

export default router;