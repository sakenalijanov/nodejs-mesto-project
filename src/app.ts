import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user';
import cardRoutes from './routes/card';

const port = process.env.PORT;
const dbUrl = process.env.MONGO_DB_URL;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(dbUrl as string);

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
app.use((req: Request, res: Response) => {
  res.status(404).json({ message: 'Страница не найдена' });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
