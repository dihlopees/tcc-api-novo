import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from '../dtos/course/CreateCourseDTO';
import { EditCourseDTO } from '../dtos/course/EditCourseDTO';
import { Course } from '../entities/CourseEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class CourseService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async create(entity: CreateCourseDTO) {
    return await this.courseRepository.save(entity);
  }

  async update(id: number, unit: EditCourseDTO) {
    return await this.courseRepository.update(id, { name: unit.name });
  }

  async getOne(user: number) {
    const entityFound = await this.courseRepository.findOneBy({
      id: user,
    });

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return entityFound;
  }

  async getAll(entities?: number[]) {
    const allEntities = await this.courseRepository.find();

    if (!allEntities.length)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrados',
        HttpStatus.NOT_FOUND,
      );

    return allEntities;
  }

  async delete(
    entityToDelete: number,
    loggedUser: number,
  ): Promise<number | null | undefined> {
    const deletedEntities = await this.courseRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
