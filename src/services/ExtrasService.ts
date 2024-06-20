import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, In, Repository } from 'typeorm';
import { CreateExtrasDTO } from '../dtos/extras/CreateExtrasDTO';
import { UpdateExtrasDTO } from '../dtos/extras/UpdateExtrasDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { Allocatable } from '../entities/AllocatableEntity';
import { Booking } from '../entities/BookingEntity';
import { Extras } from '../entities/ExtrasEntity';
import { ReservationHasExtras } from '../entities/ReservationHasExtrasEntity';
import { UnitEntity } from '../entities/UnitEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class ExtrasService {
  constructor(
    @InjectRepository(Extras)
    private readonly extrasRepository: Repository<Extras>,

    @InjectRepository(UnitEntity)
    private readonly unitRepository: Repository<UnitEntity>,

    @InjectRepository(Allocatable)
    private readonly allocatableRepository: Repository<Allocatable>,

    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,

    @InjectRepository(ReservationHasExtras)
    private readonly reservationHasExtrasRepository: Repository<ReservationHasExtras>,
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
    return await this.extrasRepository.update(id, {
      name: entityToUpdate.name,
      availableQuantity: entityToUpdate.availableQuantity,
      unitId: entityToUpdate.unitId,
    });
  }

  async countAmountLeft(
    startDate: string,
    startTime: string,
    allocatableId: number,
  ) {
    const bookingsOnSameTime = await this.bookingRepository.find({
      where: {
        startDate: startDate,
        startTime: startTime,
      },
    });
    const reservationsId = bookingsOnSameTime.map((it) => it.id);

    const reservationHasExtras = await this.reservationHasExtrasRepository.find(
      {
        where: {
          reservationId: In(reservationsId),
        },
      },
    );

    const allocatableEntity = await this.allocatableRepository.findOne({
      where: { id: allocatableId },
      relations: ['block'],
    });

    const extrasEntities = await this.extrasRepository.find({
      where: { unitId: allocatableEntity?.block.unitId },
    });

    const extrasLeft = extrasEntities.map((extra) => {
      const reservationOfExtra = reservationHasExtras.find(
        (rhx) => rhx.extraId === extra.id,
      );
      if (!reservationOfExtra) return;
      return {
        id: extra.id,
        name: extra.name,
        unitId: extra.unitId,
        availableQuantity:
          extra.availableQuantity - reservationOfExtra.reservedQuantity,
      };
    });

    return extrasLeft;
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

  async getAll(filter: {
    unitId?: number;
    allocatableId?: number;
    startDate?: string;
    startTime?: string;
  }) {
    const where: FindManyOptions<Extras>['where'] = {};

    if (filter.unitId) where.unitId = filter.unitId;
    if (filter.allocatableId) {
      const allocatableEntity = await this.allocatableRepository.findOne({
        where: { id: filter.allocatableId },
        order: { createdAt: 'DESC' },
        relations: ['block'],
      });

      where.unitId = allocatableEntity?.block.unitId;
    }
    if (filter.startDate && filter.startTime && filter.allocatableId)
      return this.countAmountLeft(
        filter.startDate,
        filter.startTime,
        filter.allocatableId,
      );

    const allEntities = await this.extrasRepository.find({ where });

    if (!allEntities.length) return [];

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

    const deletedEntities = await this.extrasRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
