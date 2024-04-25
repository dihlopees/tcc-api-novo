import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllocatableType } from '../entities/AllocatableTypeEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class AllocatableTypeService {
  constructor(
    @InjectRepository(AllocatableType)
    private readonly allocatableTypeRepository: Repository<AllocatableType>,
  ) {}

  async getOne(user: number): Promise<AllocatableType> {
    const entityFound = await this.allocatableTypeRepository.findOneBy({
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
    const allEntities = await this.allocatableTypeRepository.find();

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
    const deletedEntities =
      await this.allocatableTypeRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
