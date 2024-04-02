import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoleEntity } from '../entities/RoleEntity';
import { UserEntity } from '../entities/UserEntity';
import { LoginReponseDTO } from 'src/dtos/login/LoginResponseDTO';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { HttpExceptionDTO } from 'src/helpers/HttpExceptionDTO';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async login(userDTO: LoggedUserDTO) {
    const user = await this.usersRepository.findOneBy({
      email: userDTO.email,
    });

    if (!user)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.NOT_FOUND,
      );

    // const passwordMatch = await this.userService.comparePassword(
    //   userDTO.password,
    //   user.password,
    // );
    // if (!passwordMatch) {
    //   await this.userService.incrementFailedLoginAttempts(user.id);
    //   throw new UnauthorizedException(
    //     ExceptionDTO.warn('Unauthorized', 'Invalid password', 'Senha inválida'),
    //   );
    // }
    // // const jwtToken = await this.generateToken(user, userDTO.keepLoggedIn)
    // await this.userService.resetFailedLoginAttempts(user);
    // return { ...jwtToken, forcePasswordUpdate: user.forcePasswordUpdate };
  }
}
