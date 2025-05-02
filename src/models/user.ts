import { Document, model, Schema } from "mongoose";
import validator from "validator";
export interface IUser extends Document {
  name: string;
  about: string;
  avatar: string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator: (url: string) => validator.isURL(url),
      message: "Неправильный формат ссылки",
    },
  },
});

export default model<IUser>("user", userSchema);
