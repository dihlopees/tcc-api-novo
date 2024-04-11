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
import { CreateExtrasDTO } from '../dtos/extras/CreateExtrasDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { ExtrasService } from '../services/ExtrasService';

@Controller('extras')
export class ExtrasController {
  constructor(private readonly extrasService: ExtrasService) {}

  @Post()
  async create(@Body(JoiPipe) unit: CreateExtrasDTO) {
    const entityCreated = await this.extrasService.create(unit);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch()
  async edit(@Body(JoiPipe) entityToUpdate: EditUnitDTO) {
    const entityEdited = await this.extrasService.update(entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.extrasService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.extrasService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete()
  async delete(@Body(JoiPipe) deleteEntity: EditUnitDTO) {
    try {
      await this.extrasService.delete(deleteEntity.id, 1);
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
