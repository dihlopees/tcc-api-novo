export class LoginReponseDTO {
  accessToken: string;

  constructor(token: string) {
    this.accessToken = token;
  }
}
