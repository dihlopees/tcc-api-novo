export class UpdateUserDTO {
  name?: string;
  email?: string;
  userRole?: string;

  constructor(name?: string, email?: string, userRole?: string) {
    this.name = name;
    this.email = email;
    this.userRole = userRole;
  }
}
