import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
      match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
      minLength: [2, 'Min length for username is 2'],
    },
    avatarPath: {
      type: String,
      required: true,
      minLength: ['5', 'Min length for avatar path is 5'],
    },
  },
  { timestamps: true },
);

export const UserModel = model<UserDocument>('User', userSchema);
