import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BookingFilterDTO } from '../dtos/booking/BookingFilterDTO';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { EditBookingDTO } from '../dtos/booking/EditBookingDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { Allocatable } from '../entities/AllocatableEntity';
import { Booking } from '../entities/BookingEntity';
import { Extras } from '../entities/ExtrasEntity';
import { ReservationHasExtras } from '../entities/ReservationHasExtrasEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(Allocatable)
    private readonly allocatableRepository: Repository<Allocatable>,
    @InjectRepository(Extras)
    private readonly extrasRepository: Repository<Extras>,
    @InjectRepository(ReservationHasExtras)
    private readonly reservationHasExtrasRepository: Repository<ReservationHasExtras>,
  ) {}

  async create(booking: CreateBookingDTO, user: UserDTO) {
    const newBooking = {
      userId: user.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
      startDate: booking.startDate,
      endDate: booking.endDate,
      reservationColor: booking.reservationColor,
      allocatableId: booking.allocatableId,
      note: booking.note,
      bookedForUserId: booking.bookedForUserId,
      courseId: booking.courseId,
    };

    const bookingReservationEntities = await this.bookingRepository.find({
      where: {
        allocatableId: booking.allocatableId,
        startDate: booking.startDate,
        startTime: booking.startTime,
      },
    });

    if (bookingReservationEntities.length)
      throw HttpExceptionDTO.warn(
        `Allocatable already has a reservation at this date and time`,
        'Recurso já está reservado nesse dia e horário',
        HttpStatus.BAD_REQUEST,
      );

    const savedReservation = await this.bookingRepository.save(newBooking);

    if (booking.extras) {
      const allocatableEntity = await this.allocatableRepository.findOne({
        where: { id: savedReservation.allocatableId },
        relations: ['block'],
      });

      const allowExtrasOnUnit = await this.extrasRepository.find({
        where: { unitId: allocatableEntity?.block.unitId },
      });
      const allowIds = allowExtrasOnUnit.map((it) => it.id);
      const checkExtras = booking.extras?.filter((it) =>
        allowIds.includes(it.id),
      );

      checkExtras.forEach(async (it) => {
        const extra = {
          reservationId: savedReservation.id,
          extraId: it.id,
          reservedQuantity: it.quantity,
        };

        await this.reservationHasExtrasRepository.save(extra);
      });
    }
    return savedReservation;
  }

  async update(id: number, booking: EditBookingDTO, user: UserDTO) {
    const entityFound = await this.bookingRepository.findOne({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const newBooking = {
      startTime: booking.startTime,
      endTime: booking.endTime,
      courseId: booking.courseId,
      bookedForUserId: booking.bookedForUserId,
      reservationColor: booking.reservationColor,
      note: booking.note,
    };

    return await this.bookingRepository.update(id, newBooking);
  }

  async getOne(bookingId: number, user: UserDTO) {
    const entityFound = await this.bookingRepository.findOne({
      where: {
        id: bookingId,
        userId: user.id,
      },
    });

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return entityFound;
  }

  async getAll(user: UserDTO, filters?: BookingFilterDTO) {
    const where: FindManyOptions<Booking>['where'] = {};

    where.userId = user.id;
    if (filters) {
      if (filters.endTime) where.endTime = filters.endTime;
      if (filters.startTime) where.startTime = filters.startTime;
    }

    const allEntities = await this.bookingRepository.find({ where });

    return allEntities;
  }

  async delete(
    entityToDelete: number,
    loggedUser: UserDTO,
  ): Promise<number | null | undefined> {
    const entityFound = await this.bookingRepository.findOne({
      where: {
        id: entityToDelete,
        userId: loggedUser.id,
      },
    });

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    const deletedEntities = await this.bookingRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
