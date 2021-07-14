import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import passport from 'passport';
import passportMiddleware from './middlewares/passport';

import authRoutes from './routes/auth.routes';
import specialRoutes from './routes/special.routes';
import planeRoutes from './routes/planes.routes';
import seatsRoutes from './routes/seats.routes';
import flightsRoutes from './routes/flights.routes';
import priceRoutes from './routes/price.routes';
import searchRoutes from './routes/search.routes';
import videoRoutes from './routes/video.routes';
import paymentRoutes from './routes/payment.routes';
import purchaseRoutes from './routes/purchase.routes';
import ticketRoutes from './routes/ticket.routes';
import reportsRoutes from './routes/reports.routes';

const app = express();

// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(passport.initialize());
passport.use(passportMiddleware);


// Routes
app.use('/auth', authRoutes);
app.use('/planes', planeRoutes);
app.use('/seats', seatsRoutes);
app.use('/flights', flightsRoutes);
app.use('/prices', priceRoutes);
app.use('/search', searchRoutes);
app.use('/video', videoRoutes);
app.use('/payment', paymentRoutes);
app.use('/purchases', purchaseRoutes);
app.use('/ticket', ticketRoutes);
app.use('/reports', reportsRoutes);
app.use(specialRoutes);


export default app;