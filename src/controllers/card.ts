import { Request, Response } from 'express';
import { Error as MongooseError, Types } from 'mongoose';

import Card from '../models/card';

export const getCards = async (req: Request, res: Response) => {
  Card.find({})
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const createCard = async (
  req: Request,
  res: Response,
) => {
  const { name, link } = req.body;
  Card.create({
    name,
    link,
    owner: res.locals.user._id,
  })
    .then((cards) => {
      res.send({ data: cards });
    })
    .catch((err) => {
      if (err instanceof MongooseError.ValidationError) {
        res.status(400).send({ message: err.message });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

export const deleteCard = async (req: Request, res: Response) => {
  const { cardId } = req.params;
  if (!Types.ObjectId.isValid(cardId)) {
    res.status(404).send({ message: 'Неверный id карточки' });
    return;
  }
  Card.findByIdAndDelete(cardId)
    .then((card) => {
      if (!card) {
        res.status(404).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const likeCard = (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { cardId } = req.params;
  if (!Types.ObjectId.isValid(cardId)) {
    res.status(400).send({ message: 'Неверный id карточки' });
    return;
  }
  Card.findByIdAndUpdate(
    cardId,
    { $addToSet: { likes: userId } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        res.status(400).send({ message: 'Карточка не найдена' });
      }
      res.send({ data: card });
    })

    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

export const dislikeCard = (req: Request, res: Response) => {
  const userId = res.locals.user._id;
  const { cardId } = req.params;
  if (!Types.ObjectId.isValid(cardId)) {
    res.status(400).send({ message: 'Неверный id карточки' });
    return;
  }
  Card.findByIdAndUpdate(cardId, { $pull: { likes: userId } }, { new: true })
    .then((card) => {
      res.send({ data: card });
    })
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};
