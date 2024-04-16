import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateUserDTO } from '../dtos/users/CreateUserDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserEntity } from '../entities/UserEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
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

  @Patch()
  async editUser(
    @Body(JoiPipe) user: UpdateUserDTO,
  ): Promise<ResponseDTO<true, unknown> | undefined> {
    const newUser = await this.userService.updateUser(user);
    if (newUser)
      return new ResponseDTO(
        HttpStatus.OK,
        'Usuário atualizado com sucesso',
        newUser,
      );
  }

  @Get('/me')
  async getMe(
    @Body(JoiPipe) user: number,
  ): Promise<ResponseDTO<UserEntity, unknown>> {
    const myUser = await this.userService.getMe(user);
    return new ResponseDTO(HttpStatus.OK, 'User retrived', myUser);
  }

  @Get('/all')
  async getAll(
    @Body(JoiPipe) users?: number[],
  ): Promise<ResponseDTO<UserEntity[], unknown>> {
    console.log('usuer');
    const allUsers = await this.userService.getAll(users);

    return new ResponseDTO(HttpStatus.OK, 'Users retrived', allUsers);
  }

  @Delete('/:id')
  async deleteUsers(
    @Param(JoiPipe) users: number,
  ): Promise<ResponseDTO<unknown, unknown>> {
    try {
      await this.userService.deleteUsers(users, 1);
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
