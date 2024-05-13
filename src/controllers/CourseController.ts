import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateCourseDTO } from '../dtos/course/CreateCourseDTO';
import { EditCourseDTO } from '../dtos/course/EditCourseDTO';
import { ReqUserDTO } from '../helpers/ReqUserDTO';
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

  @Patch('/:id')
  async edit(
    @Param(JoiPipe) id: number,
    @Body(JoiPipe) entityToUpdate: EditCourseDTO,
  ) {
    const entityEdited = await this.courseService.update(id, entityToUpdate);
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

  @Delete('/:id')
  async delete(
    @Param(JoiPipe) deleteEntity: number,
    @Req() request: ReqUserDTO,
  ) {
    await this.courseService.delete(deleteEntity, request.user);
    return new ResponseDTO(HttpStatus.OK, 'Deletado');
  }
}
