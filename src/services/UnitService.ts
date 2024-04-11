import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUnitDTO } from '../dtos/unit/CreateUnitDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
import { UnitEntity } from '../entities/UnitEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class UnitService {
  constructor(
    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async create(unit: CreateUnitDTO): Promise<UnitEntity> {
    return await this.unitRepository.save(unit);
  }

  async update(unit: EditUnitDTO) {
    return await this.unitRepository.update(unit.id, { name: unit.name });
  }

  async getOne(user: number) {
    const entityFound = await this.unitRepository.findOneBy({
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
    const allEntities = await this.unitRepository.find();

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
    const deletedEntities = await this.unitRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
