import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';
import VideoManager from '../classes/VideoManager/VideoManager';
import VideoProviderProxy from '../classes/VideoManager/VideoProviderProxy';
import VideoProviderClass from '../classes/VideoManager/VideoProviderClass';



export const getVideo = async (req: Request, res: Response) => {

    const videoProviderProxy = new VideoProviderProxy(new VideoProviderClass());

    const videoManager: VideoManager = new VideoManager(videoProviderProxy);

    res.send((await videoManager.provider.getVideo(req.params.id)).toString());
}