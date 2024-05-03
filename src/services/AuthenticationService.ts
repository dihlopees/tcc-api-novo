import { HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { LoggedUserDTO } from 'src/dtos/login/LoggedUser';
import { HttpExceptionDTO } from 'src/helpers/HttpExceptionDTO';
import { Repository } from 'typeorm';
import { LoginReponseDTO } from '../dtos/login/LoginResponseDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { UserEntity } from '../entities/UserEntity';

@Injectable()
export class AuthenticationService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDTO: LoggedUserDTO): Promise<LoginReponseDTO> {
    const user = await this.usersRepository.findOne({
      where: { email: userDTO.email },
      relations: ['role'],
    });

    if (!user)
      throw HttpExceptionDTO.warn(
        `User not found`,
        'Usuário não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const passwordMatch = await bcrypt.compare(userDTO.password, user.password);

    if (!passwordMatch) {
      throw HttpExceptionDTO.error(
        'Unauthorized',
        'Invalid password',
        HttpStatus.FORBIDDEN,
      );
    }
    const payloadUser = new UserDTO(user, user.role.role);
    const tokenPayload = { payload: payloadUser };

    const jwtToken = await this.jwtService.signAsync(tokenPayload, {
      expiresIn: '7d',
    });

    return new LoginReponseDTO(jwtToken);
  }
}
