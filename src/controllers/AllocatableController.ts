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
import { CreateAllocatableDTO } from '../dtos/allocatable/CreateAllocatableDTO';
import { EditAllocatableDTO } from '../dtos/allocatable/EditAllocatableDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { AllocatableService } from '../services/AllocatableService';

@Controller('allocatable')
export class AllocatableController {
  constructor(private readonly allocatableService: AllocatableService) {}

  @Post()
  async create(@Body(JoiPipe) entity: CreateAllocatableDTO) {
    const entityCreated = await this.allocatableService.create(entity);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch('/:id')
  async edit(
    @Param() id: number,
    @Body(JoiPipe) entityToUpdate: EditAllocatableDTO,
  ) {
    const entityEdited = await this.allocatableService.update(
      id,
      entityToUpdate,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.allocatableService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.allocatableService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(@Param(JoiPipe) deleteEntity: number) {
    try {
      await this.allocatableService.delete(deleteEntity, 11);
      return new ResponseDTO(HttpStatus.OK, 'Deletado');
    } catch (err) {
      throw HttpExceptionDTO.error(
        `Users not deleted`,
        err,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
