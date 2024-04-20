import { Controller, Delete, Get, HttpStatus, Param } from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { AllocatableTypeService } from '../services/AllocatableTypeService';

@Controller('allocatable-type')
export class AllocatableTypeController {
  constructor(
    private readonly allocatableTypeService: AllocatableTypeService,
  ) {}

  @Get('/all')
  async getAll() {
    const allEntities = await this.allocatableTypeService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.allocatableTypeService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(@Param(JoiPipe) deleteEntity: number) {
    try {
      await this.allocatableTypeService.delete(deleteEntity, 11);
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
