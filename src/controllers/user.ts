import { Request, Response } from 'express';
import { Error as MongooseError, Types } from 'mongoose';
import User from '../models/user';

export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { name, about, avatar } = req.body;

    const user = await User.create({ name, about, avatar });

    res.send({ data: user });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      res.status(400).send({ message: err.message });
      return;
    }
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  const { userId } = req.params;

  if (!Types.ObjectId.isValid(userId)) {
    res.status(404).send({ message: 'Пользователь не найден' });
    return;
  }

  try {
    const user = await User.findById(userId);
    res.send({ data: user });
  } catch (err) {
    res.status(500).send({ message: 'Произошла ошибка на сервере' });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  User.find({})
    .then((users) => {
      if (!users) {
        return res.status(404).send({ message: 'Пользователей не найдено' });
      }
      return res.send({ data: users });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const updateUserInfo = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  if (!Types.ObjectId.isValid(userId)) {
    res.status(404).send({ message: 'Пользователь не найден' });
    return;
  }
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    userId,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const updateUserAvatar = async (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { avatar } = req.body;
  if (!Types.ObjectId.isValid(userId)) {
    res.status(404).send({ message: 'Пользователь не найден' });
    return;
  }
  User.findByIdAndUpdate(userId, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
