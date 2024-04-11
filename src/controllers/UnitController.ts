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
import { CreateUnitDTO } from '../dtos/unit/CreateUnitDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { UnitService } from '../services/UnitService';

@Controller('unit')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  async create(@Body(JoiPipe) unit: CreateUnitDTO) {
    const entityCreated = await this.unitService.create(unit);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch()
  async edit(@Body(JoiPipe) entityToUpdate: EditUnitDTO) {
    const entityEdited = await this.unitService.update(entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.unitService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.unitService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete()
  async delete(@Body(JoiPipe) deleteEntity: EditUnitDTO) {
    try {
      await this.unitService.delete(deleteEntity.id, 1);
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
