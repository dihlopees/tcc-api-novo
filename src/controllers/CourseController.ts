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
import { CreateCourseDTO } from '../dtos/course/CreateCourseDTO';
import { EditCourseDTO } from '../dtos/course/EditCourseDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { CourseService } from '../services/CourseService';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async create(@Body(JoiPipe) entity: CreateCourseDTO) {
    const entityCreated = await this.courseService.create(entity);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch()
  async edit(@Body(JoiPipe) entityToUpdate: EditCourseDTO) {
    const entityEdited = await this.courseService.update(entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.courseService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.courseService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete()
  async delete(@Body(JoiPipe) deleteEntity: EditUnitDTO) {
    try {
      await this.courseService.delete(deleteEntity.id, 1);
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
