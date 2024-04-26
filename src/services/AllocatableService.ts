import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AllocatableDTO } from '../dtos/allocatable/AllocatableDTO';
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
    const newItems = {
      seatsQuantity: entity.items.seatsQuantity ?? undefined,
      multimediaQuantity: entity.items.multimediaQuantity ?? undefined,
      outletsQuantity: entity.items.outletsQuantity ?? undefined,
      airConditionersQuantity:
        entity.items.airConditionersQuantity ?? undefined,
      allowsTransmission: entity.items.allowsTransmission ?? undefined,
    };

    const itemsCreated = await this.itemsAllocatableRepository.save(newItems);

    const newAllocatable = {
      name: entity.name,
      typeId: entity.typeId,
      blockId: entity.blockId,
      itemsAllocatableId: itemsCreated.id,
    };
    const { id } = await this.allocatableRepository.save(newAllocatable);

    const savedEntity = await this.allocatableRepository.findOne({
      where: { id },
      relations: ['items'],
    });
    if (!savedEntity)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );
    return savedEntity;
  }

  async update(allocatableId: number, entity: EditAllocatableDTO) {
    const savedEntity = await this.allocatableRepository.findOneByOrFail({
      id: allocatableId,
    });

    if (!savedEntity)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    //ERRRADOO FUNÇÃO DE EDITAR ITEM
    const newItems = {
      seatsQuantity: entity.items.seatsQuantity ?? undefined,
      multimediaQuantity: entity.items.multimediaQuantity ?? undefined,
      outletsQuantity: entity.items.outletsQuantity ?? undefined,
      airConditionersQuantity:
        entity.items.airConditionersQuantity ?? undefined,
      allowsTransmission: entity.items.allowsTransmission ?? undefined,
    };
    if (entity.items) {
      await this.itemsAllocatableRepository.update(
        savedEntity.itemsAllocatableId,
        newItems,
      );
    }

    const newAllocatable = {
      id: savedEntity.id,
      name: entity.name,
      typeId: entity.typeId,
      blockId: entity.blockId,
    };
    const allocatableSaved =
      await this.allocatableRepository.save(newAllocatable);

    const itemsOnAllocatable =
      await this.itemsAllocatableRepository.findOneOrFail({
        where: { id: savedEntity.itemsAllocatableId },
      });

    return new AllocatableDTO(allocatableSaved, itemsOnAllocatable);
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
