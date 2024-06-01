import { UserEntity } from '../../entities/UserEntity';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  forcePassword: boolean;

  constructor(user: UserEntity, role: string) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.role = role;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.forcePassword = user.forcePassword;
  }
}
