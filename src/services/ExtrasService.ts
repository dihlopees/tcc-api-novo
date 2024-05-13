import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateExtrasDTO } from '../dtos/extras/CreateExtrasDTO';
import { UpdateExtrasDTO } from '../dtos/extras/UpdateExtrasDTO';
import { Extras } from '../entities/ExtrasEntity';
import { UnitEntity } from '../entities/UnitEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectRepository(Extras)
    private readonly extrasRepository: Repository<Extras>,

    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,
  ) {}

  async create(entity: CreateExtrasDTO): Promise<Extras> {
    const unitEntity = await this.unitRepository.findOneBy({
      id: entity.unitId,
    });

    if (!unitEntity)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada a unidade informada',
        HttpStatus.NOT_FOUND,
      );

    const newExtra = {
      name: entity.name,
      availableQuantity: entity.availableQuantity,
      unitId: unitEntity.id,
    };
    return await this.extrasRepository.save(newExtra);
  }

  async update(id: number, entityToUpdate: UpdateExtrasDTO) {
    const unitEntity = await this.unitRepository.findOneBy({
      name: entityToUpdate.unit,
    });

    if (!unitEntity)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada a unidade informada',
        HttpStatus.NOT_FOUND,
      );

    return await this.extrasRepository.update(id, {
      name: entityToUpdate.name,
      availableQuantity: entityToUpdate.availableQuantity,
      unitId: unitEntity.id,
    });
  }

  async getOne(user: number) {
    const entityFound = await this.extrasRepository.findOneBy({
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

  async getAll(filter: { unitId: number }) {
    const where: FindManyOptions<Extras>['where'] = {};

    if (filter.unitId) where.unitId = filter.unitId;
    const allEntities = await this.extrasRepository.find({ where });

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
    const deletedEntities = await this.extrasRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
