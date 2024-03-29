import { Controller } from '@nestjs/common';
import { AuthenticationService } from '../services/AuthenticationService';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}
}
