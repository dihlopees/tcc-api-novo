import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateAllocatableDTO } from '../dtos/allocatable/CreateAllocatableDTO';
import { EditAllocatableDTO } from '../dtos/allocatable/EditAllocatableDTO';
import { FilterAllocatableDTO } from '../dtos/allocatable/FilterAllocatableDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ReqUserDTO } from '../helpers/ReqUserDTO';
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
    @Param('id') id: number,
    @Body(JoiPipe) entityToUpdate: EditAllocatableDTO,
  ) {
    const entityEdited = await this.allocatableService.update(
      id,
      entityToUpdate,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited,
    );
  }

  @Get('/all')
  async getAll(@Query() filter: FilterAllocatableDTO) {
    const allEntities = await this.allocatableService.getAll(filter);

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.allocatableService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(
    @Param(JoiPipe) deleteEntity: number,
    @Req() request: ReqUserDTO,
  ) {
    try {
      await this.allocatableService.delete(deleteEntity, request.user);
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
