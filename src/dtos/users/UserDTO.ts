import { UserEntity } from '../../entities/UserEntity';

export class UserDTO {
  id: number;
  name: string;
  email: string;
  userRole: string;

  constructor(user: UserEntity) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.userRole = user.role.role;
  }
}
