import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import config from '../config/config';
import User from '../models/User';

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
    
        if (user) {
            return done(null, user);
        }
        return done(null, null);
    } catch (error) {
        console.error(error);
    }
});