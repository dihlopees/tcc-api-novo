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
import { CreateExtrasDTO } from '../dtos/extras/CreateExtrasDTO';
import { UpdateExtrasDTO } from '../dtos/extras/UpdateExtrasDTO';
import { ReqUserDTO } from '../helpers/ReqUserDTO';
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

  @Patch('/:id')
  async edit(
    @Param('id') id: number,
    @Body(JoiPipe) entityToUpdate: UpdateExtrasDTO,
  ) {
    const entityEdited = await this.extrasService.update(id, entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll(@Query() filter: { unitId?: number; allocatableId?: number }) {
    const allEntities = await this.extrasService.getAll(filter);

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.extrasService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(
    @Param(JoiPipe) deleteEntity: number,
    @Req() request: ReqUserDTO,
  ) {
    await this.extrasService.delete(deleteEntity, request.user);
    return new ResponseDTO(HttpStatus.OK, 'Deletado');
  }
}
