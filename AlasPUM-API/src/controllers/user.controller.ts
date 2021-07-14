import { Request, Response } from 'express';
import User, { IUser } from '../models/User';
import jwt from 'jsonwebtoken';
import config from '../config/config';

function createToken(user: IUser) {
    return jwt.sign({ id: user._id, username: user.username }, config.jwtSecret, {
        expiresIn: 86400
    });
}

export const signUp = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
        return res.send({ msg: "Please fill all the inputs" });
    }

    const user = await User.findOne({ username: req.body.username })
    if (user) {
        return res.send({ msg: "This username is already used" })
    }

    const newUser = new User(req.body);

    newUser.save();

    return res.json(newUser);
}

export const signIn = async (req: Request, res: Response) => {
    if (!req.body.username || !req.body.password) {
        return res.send({ msg: "Please fill all the inputs" });
    }

    const user = await User.findOne({ username: req.body.username })

    if (!user) {
        res.send({ msg: 'This user does not exist' });
    }

    const isMatch = await user?.comparePasswords(req.body.password);

    if (isMatch && user) {
        return res.send({ token: createToken(user) });
    }

    res.send({ msg: 'Username or Password are incorrect' });
}