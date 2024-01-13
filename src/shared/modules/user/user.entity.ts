import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { User } from '../../types/index.js';
import { createSHA256 } from '../../helpers/index.js';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({
    unique: true,
    required: true,
  })
  public email: string;

  @prop({
    unique: true,
    required: false,
  })
  public username: string;

  @prop({
    required: false,
    default: '',
  })
  public avatarPath: string;

  @prop({
    required: true,
  })
  private password?: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.username = userData.username;
    this.avatarPath = userData.avatarPath;
  }

  public setPassword(password: string, salt: string): void {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
