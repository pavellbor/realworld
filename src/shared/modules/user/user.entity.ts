import { defaultClasses, getModelForClass, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';

export interface UserEntity extends defaultClasses.Base, defaultClasses.TimeStamps {}

export class UserEntity implements User {
  @prop({
    unique: true,
    required: true,
  })
  email: string;

  @prop({
    unique: true,
    required: false,
  })
  username: string;

  @prop({
    required: false,
    default: '',
  })
  avatarPath: string;
}

export const UserModel = getModelForClass(UserEntity);
