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
import { CreateBlockDTO } from '../dtos/block/CreateBlockDTO';
import { EditBlockDTO } from '../dtos/block/EditBlockDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { BlockService } from '../services/BlockService';

@Controller('block')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post()
  async create(@Body(JoiPipe) block: CreateBlockDTO) {
    const entityCreated = await this.blockService.create(block);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch('/:id')
  async edit(@Param() id: number, @Body(JoiPipe) entityToUpdate: EditBlockDTO) {
    const entityEdited = await this.blockService.update(id, entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.blockService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.blockService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(@Param(JoiPipe) deleteEntity: number) {
    try {
      await this.blockService.delete(deleteEntity, 11);
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
