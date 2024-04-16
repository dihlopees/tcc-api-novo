import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { AuthenticationService } from '../services/AuthenticationService';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post('/login')
  async login(@Body(JoiPipe) userDTO: LoggedUserDTO) {
    const token = await this.authenticationService.login(userDTO);
    return new ResponseDTO(HttpStatus.OK, 'User register', token);
  }
}
