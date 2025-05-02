import {
  Document, model, ObjectId, Schema,
} from 'mongoose';
import validator from 'validator';

export interface ICard extends Document {
  name: string;
  link: string;
  owner: ObjectId;
  likes: Array<ObjectId>;
  createdAt: Date;
}

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  owner: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  likes: {
    type: [],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: 'Неправильный формат ссылки',
    },
  },
});

export default model<ICard>('card', cardSchema);
