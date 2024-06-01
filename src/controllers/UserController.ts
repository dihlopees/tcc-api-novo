import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { UpdatePasswordUserDTO } from '../dtos/users/ChangePasswordDTO';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { ReqUserDTO } from '../helpers/ReqUserDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { UserService } from '../services/UserService';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(JoiPipe) user: CreateUserDTO) {
    const newUser = await this.userService.createUser(user);
    return new ResponseDTO(HttpStatus.OK, 'User retrived', newUser);
  }

  @Patch('/:id')
  async editUser(
    @Param() id: number,
    @Body(JoiPipe) user: UpdateUserDTO,
  ): Promise<ResponseDTO<true, unknown> | undefined> {
    const newUser = await this.userService.updateUser(id, user);
    if (newUser)
      return new ResponseDTO(
        HttpStatus.OK,
        'Usuário atualizado com sucesso',
        newUser,
      );
  }

  @Patch('/password/:id')
  async editPassword(
    @Param('id') id: number,
    @Body(JoiPipe) userPasswords: UpdatePasswordUserDTO,
  ): Promise<ResponseDTO<true, unknown> | undefined> {
    const newUser = await this.userService.updateUserPassword(
      id,
      userPasswords,
    );
    if (newUser)
      return new ResponseDTO(
        HttpStatus.OK,
        'Senha atualizada com sucesso',
        newUser,
      );
  }

  @Get('/me')
  async getMe(
    @Req() userLogged: ReqUserDTO,
  ): Promise<ResponseDTO<UserDTO, unknown>> {
    const myUser = await this.userService.getMe(userLogged.user.id);
    return new ResponseDTO(HttpStatus.OK, 'User retrived', myUser);
  }

  @Get('/all')
  async getAll() {
    const allUsers = await this.userService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Users retrived', allUsers);
  }

  @Delete('/:id')
  async deleteUsers(
    @Param(JoiPipe) users: number,
    @Req() userLogged: ReqUserDTO,
  ): Promise<ResponseDTO<unknown, unknown>> {
    const response = await this.userService.deleteUsers(users, userLogged.user);
    return new ResponseDTO(HttpStatus.OK, 'Users deleted', response);
  }
}
