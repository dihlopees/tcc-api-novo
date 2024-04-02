import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { DeleteUsersDTO } from '../dtos/users/DeleteUsersDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserEntity } from '../entities/UserEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { UserService } from '../services/UserService';
import { JoiPipe } from 'nestjs-joi';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body(JoiPipe) user: CreateUserDTO): Promise<UserEntity> {
    const newUser = await this.userService.createUser(user);
    return newUser;
  }

  @Patch()
  async editUser(@Body(JoiPipe) user: UpdateUserDTO) {
    const newUser = await this.userService.updateUser(user);
    if (newUser)
      return new ResponseDTO(HttpStatus.OK, 'Usuário atualizado com sucesso');
  }

  @Get('/me')
  async getMe(@Body(JoiPipe) user: number) {
    const myUser = await this.userService.getMe(user);
    return myUser;
  }

  @Get('/all')
  async getAll(@Body(JoiPipe) user: number) {
    const allUsers = await this.userService.getAll([user]);

    return allUsers;
  }

  @Delete()
  async deleteUsers(@Body(JoiPipe) users: DeleteUsersDTO) {
    try {
      await this.userService.deleteUsers(users.ids, 1);
      return new ResponseDTO(HttpStatus.OK, 'Users deleted');
    } catch (err) {
      throw HttpExceptionDTO.error(
        `Users not deleted`,
        err,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
