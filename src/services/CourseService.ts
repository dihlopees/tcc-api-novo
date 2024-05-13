import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCourseDTO } from '../dtos/course/CreateCourseDTO';
import { EditCourseDTO } from '../dtos/course/EditCourseDTO';
import { UserDTO } from '../dtos/users/UserDTO';
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

  async getAll() {
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
    user: UserDTO,
  ): Promise<number | null | undefined> {
    if (user.role !== 'admin')
      throw HttpExceptionDTO.warn(
        `User not have permission`,
        'Usuário não tem permissão para deletar recursos',
        HttpStatus.FORBIDDEN,
      );

    const deletedEntities = await this.courseRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
