import { User } from '../../types/index.js';

export class UserEntity implements User {
  email: string;
  username: string;
  avatarPath: string;
}
