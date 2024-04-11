import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateExtrasDTO } from '../dtos/extras/CreateExtrasDTO';
import { EditUnitDTO } from '../dtos/unit/EditUnitDTO';
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
      name: entity.unit,
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

  async update(unit: EditUnitDTO) {
    return await this.extrasRepository.update(unit.id, { name: unit.name });
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

  async getAll(entities?: number[]) {
    const allEntities = await this.extrasRepository.find();

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
