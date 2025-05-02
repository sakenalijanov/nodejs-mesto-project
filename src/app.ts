import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import cardRoutes from './routes/card';

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(
  (_req: Request, res: Response, next: NextFunction) => {
    res.locals.user = {
      _id: '681206ba1028341fd4e7f37f',
    };
    next();
  },
);

app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
