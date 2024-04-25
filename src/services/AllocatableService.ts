import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAllocatableDTO } from '../dtos/allocatable/CreateAllocatableDTO';
import { EditAllocatableDTO } from '../dtos/allocatable/EditAllocatableDTO';
import { Allocatable } from '../entities/AllocatableEntity';
import { ItemsAllocatable } from '../entities/ItemsAllocatable';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class AllocatableService {
  constructor(
    @InjectRepository(Allocatable)
    private readonly allocatableRepository: Repository<Allocatable>,
    @InjectRepository(ItemsAllocatable)
    private readonly itemsAllocatableRepository: Repository<ItemsAllocatable>,
  ) {}

  async create(entity: CreateAllocatableDTO): Promise<Allocatable> {
    const itemsCreated = await this.itemsAllocatableRepository.save(
      entity.items,
    );

    const newAllocatable = {
      name: entity.name,
      typeId: entity.typeId,
      blockId: entity.blockId,
      itemsAllocatableId: itemsCreated.id,
    };
    return await this.allocatableRepository.save(newAllocatable);
  }

  async update(id: number, unit: EditAllocatableDTO) {
    return await this.allocatableRepository.update(id, { name: unit.name });
  }

  async getOne(user: number) {
    const entityFound = await this.allocatableRepository.findOneBy({
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
    const allEntities = await this.allocatableRepository.find();

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
      await this.allocatableRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
