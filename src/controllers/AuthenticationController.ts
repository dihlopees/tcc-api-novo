import { Body, Controller, HttpStatus, Post, } from '@nestjs/common';
import { AuthenticationService } from '../services/AuthenticationService';
import { JoiPipe } from 'nestjs-joi';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { HttpExceptionDTO } from 'src/helpers/HttpExceptionDTO';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body(JoiPipe) userDTO: LoggedUserDTO) {
    try {
      const token = await this.authenticationService.login(userDTO)
      return token
    } catch (error) {
      throw HttpExceptionDTO.error(
        `Unexpected error`,
        error,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
