import { Expose } from 'class-transformer';

export class UserRdo {
  @Expose()
  public email: string;

  @Expose()
  public username: string;

  @Expose()
  public avatarPath: string;
}
