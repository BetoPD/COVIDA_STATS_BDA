import express from 'express';
import customerRoutes from './routes/patients.routes.js';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use('/api', customerRoutes);

export default app;
