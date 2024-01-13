import { DocumentType } from '@typegoose/typegoose';
import { CreateUserDto } from './index.js';
import { UserService } from './user-service.interface.js';
import { UserEntity, UserModel } from './user.entity.js';

export class DefaultUserService implements UserService {
  public create(dto: CreateUserDto, salt: string): Promise<DocumentType<UserEntity>> {
    const user = new UserEntity(dto);
    user.setPassword(dto.password, salt);

    return UserModel.create(user);
  }
}
