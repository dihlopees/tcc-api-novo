export class UpdateUserDTO {
  id: number;
  name?: string;
  email?: string;
  userRole?: string;

  constructor(id: number, name?: string, email?: string, userRole?: string) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.userRole = userRole;
  }
}
