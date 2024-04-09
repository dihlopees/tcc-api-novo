import { Body, Controller, Post } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { AuthenticationService } from '../services/AuthenticationService';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body(JoiPipe) userDTO: LoggedUserDTO) {
    const token = await this.authenticationService.login(userDTO);
    console.log('login');
    return token;
  }
}
