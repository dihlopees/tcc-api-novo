import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { HttpExceptionDTO } from 'src/helpers/HttpExceptionDTO';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/RoleEntity';
import { UserEntity } from '../entities/UserEntity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly jwtService: JwtService,
  ) {}

  async login(userDTO: LoggedUserDTO): Promise<string> {
    const user = await this.usersRepository.findOneBy({
      email: userDTO.email,
    });
    console.log('1', user);

    if (!user)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const passwordMatch = await bcrypt.compare(user.password, userDTO.password);
    console.log('2');

    if (!passwordMatch) {
      throw HttpExceptionDTO.error(
        'Unauthorized',
        'Invalid password',
        HttpStatus.FORBIDDEN,
      );
    }

    const tokenPayload = { payload: user };
    console.log('3');

    const jwtToken = this.jwtService.sign(tokenPayload, {
      expiresIn: '7d',
    });

    console.log(jwtToken);
    return jwtToken;
  }
}
