import mongoose, {ConnectionOptions} from 'mongoose';
import config from './config/config';

const DBoptions: ConnectionOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose
    .connect(config.DB.connectionString, DBoptions)
    .then(() => {
        console.log('DB connected');
    })
    .catch((error) => {
        console.error(error);
    });