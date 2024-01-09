import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js';

export interface UserDocument extends User, Document {}

const userSchema = new Schema<User>({
  email: String,
  username: String,
  avatarPath: String,
});

export const UserModel = model<User>('User', userSchema);
