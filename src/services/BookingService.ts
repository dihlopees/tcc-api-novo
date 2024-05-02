import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BookingFilterDTO } from '../dtos/booking/BookingFilterDTO';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { EditBookingDTO } from '../dtos/booking/EditBookingDTO';
import { UserDTO } from '../dtos/users/UserDTO';
import { Booking } from '../entities/BookingEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(booking: CreateBookingDTO, user: UserDTO): Promise<Booking> {
    const newBooking = {
      userId: user.id,
      startTime: booking.startTime,
      endTime: booking.endTime,
      reservationColor: booking.reservationColor,
      allocatableId: booking.allocatableId,
      note: booking.note,
      bookedForUserId: booking.bookedForUserId,
      courseId: booking.courseId,
    };
    return await this.bookingRepository.save(newBooking);
  }

  async update(id: number, booking: EditBookingDTO) {
    const entityFound = await this.bookingRepository.findOneBy({
      id: id,
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

  async getOne(bookingId: number) {
    const entityFound = await this.bookingRepository.findOneBy({
      id: bookingId,
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
    const entityFound = await this.bookingRepository.findOneBy({
      id: entityToDelete,
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