import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Patch,
  Post,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateUnitDTO } from '../dtos/unit/CreateUnitDTO';
import { DeleteUsersDTO } from '../dtos/users/DeleteUsersDTO';
import { UpdateUserDTO } from '../dtos/users/UpdateUserDTO';
import { UserEntity } from '../entities/UserEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { UnitService } from '../services/UnitService';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async create(
    @Body(JoiPipe) unit: CreateUnitDTO,
  ): Promise<ResponseDTO<UserEntity, unknown>> {
    const newUser = await this.unitService.create(unit);
    return new ResponseDTO(HttpStatus.OK, 'User created', newUser);
  }

  @Patch()
  async edit(
    @Body(JoiPipe) user: UpdateUserDTO,
  ): Promise<ResponseDTO<true, unknown> | undefined> {
    const newUser = await this.unitService.update(user);
    if (newUser)
      return new ResponseDTO(
        HttpStatus.OK,
        'Usuário atualizado com sucesso',
        newUser,
      );
  }

  @Get('/one')
  async getOne(
    @Body(JoiPipe) user: number,
  ): Promise<ResponseDTO<UserEntity, unknown>> {
    const myUser = await this.unitService.getOne(user);
    return new ResponseDTO(HttpStatus.OK, 'User retrived', myUser);
  }

  @Get('/all')
  async getAll(
    @Body(JoiPipe) users?: number[],
  ): Promise<ResponseDTO<UserEntity[], unknown>> {
    const allUsers = await this.unitService.getAll(users);

    return new ResponseDTO(HttpStatus.OK, 'Users retrived', allUsers);
  }

  @Delete()
  async delete(
    @Body(JoiPipe) users: DeleteUsersDTO,
  ): Promise<ResponseDTO<unknown, unknown>> {
    try {
      await this.unitService.delete(users.ids, 1);
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
