import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { BookingFilterDTO } from '../dtos/booking/BookingFilterDTO';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { EditBookingDTO } from '../dtos/booking/EditBookingDTO';
import { GetAllBookingDTO } from '../dtos/booking/GetAllBookingDTO';
import { GetTimesUnavailableDTO } from '../dtos/booking/GetTimesUnavailableDTO';
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
      title: booking.title,
    };

    const startDate = new Date(booking.startDate);
    const endDate = new Date(booking.endDate);

    if (
      booking.endDate &&
      (startDate.getDate() !== endDate.getDate() ||
        startDate.getMonth() !== endDate.getMonth())
    )
      throw HttpExceptionDTO.warn(
        `Start date and end date must be the same`,
        'Data de início e data de fim devem ser iguais',
        HttpStatus.BAD_REQUEST,
      );

    const bookingReservationEntities = await this.bookingRepository.find({
      where: {
        allocatableId: booking.allocatableId,
        startDate: booking.startDate,
      },
    });
    const [hours, minutes] = booking.startTime.split(':');

    startDate.setHours(+hours);
    startDate.setMinutes(+minutes);

    bookingReservationEntities.forEach((it) => {
      const startDateSaveOnReservation = new Date(it.startDate);
      const [hoursSaved, minutesSaved] = it.startTime.split(':');
      startDateSaveOnReservation.setHours(+hoursSaved);
      startDateSaveOnReservation.setMinutes(+minutesSaved);

      const finalDateSaveOnReservation = new Date(it.startDate);
      const [hoursSavedFinal, minutesSavedFinal] = it.endTime.split(':');
      finalDateSaveOnReservation.setHours(+hoursSavedFinal);
      finalDateSaveOnReservation.setMinutes(+minutesSavedFinal);

      if (
        startDate.getTime() <= finalDateSaveOnReservation.getTime() &&
        startDate.getTime() >= startDateSaveOnReservation.getTime()
      ) {
        throw HttpExceptionDTO.warn(
          `Allocatable already has a reservation at this date and time`,
          'Recurso já está reservado nesse dia e horário',
          HttpStatus.BAD_REQUEST,
        );
      }
    });

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

      booking.extras.forEach(async (it) => {
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
      startDate: booking.startDate,
      endDate: booking.endDate,
      courseId: booking.courseId,
      bookedForUserId: booking.bookedForUserId,
      reservationColor: booking.reservationColor,
      note: booking.note,
      title: booking.title,
    };

    return await this.bookingRepository.update(id, newBooking);
  }

  async getOne(bookingId: number, user: UserDTO) {
    const userId = user.id;

    const entityFound = await this.bookingRepository
      .createQueryBuilder('booking')
      .leftJoinAndSelect('booking.bookingHasExtras', 'bhe')
      .leftJoinAndSelect('bhe.extra', 'extra')
      .leftJoinAndSelect('booking.allocatable', 'allocatable')
      .leftJoinAndSelect('allocatable.resourseType', 'resourseType')
      .where('booking.id = :bookingId', { bookingId })
      .andWhere('booking.userId = :userId', { userId })
      .getOne();

    if (!entityFound)
      throw HttpExceptionDTO.warn(
        `Not found`,
        'Não encontrada',
        HttpStatus.NOT_FOUND,
      );

    return new GetAllBookingDTO(
      entityFound,
      entityFound.allocatable.resourseType,
    );
  }

  async getAll(
    user: UserDTO,
    filters?: BookingFilterDTO,
  ): Promise<Record<string, GetAllBookingDTO[]>> {
    const where: FindManyOptions<Booking>['where'] = {};

    where.userId = user.id;
    if (filters) {
      if (filters.endTime) where.endTime = filters.endTime;
      if (filters.startTime) where.startTime = filters.startTime;
      if (filters.startDate && !filters.endDate)
        where.startDate = filters.startDate;
      if (filters.allocatableId) where.allocatableId = filters.allocatableId;
    }

    let allEntities = await this.bookingRepository.find({
      where,
      relations: ['allocatable.resourseType'],
    });

    if (filters && filters.startDate && filters.endDate) {
      const startDate = new Date(filters.startDate);
      const endDate = new Date(filters.endDate);

      const arrayWithDates = allEntities.map((it) => {
        const savedStartDate = new Date(it.startDate);
        const savedEndDate = new Date(it.endDate);

        if (savedStartDate >= startDate && savedEndDate <= endDate) return it;
      });

      const bookings: Booking[] = arrayWithDates.filter(
        (item): item is Booking => item instanceof Booking,
      );

      const groupedEntities = bookings.reduce(
        (acc, cur) => {
          if (!acc[cur.startDate]) {
            acc[cur.startDate] = [];
          }
          const bookingFormated = new GetAllBookingDTO(
            cur,
            cur.allocatable.resourseType,
          );

          acc[cur.startDate].push({ ...bookingFormated });
          return acc;
        },
        {} as Record<string, GetAllBookingDTO[]>,
      );
      if (groupedEntities) return groupedEntities;
    }

    const groupedEntities = allEntities.reduce(
      (acc, cur) => {
        if (!acc[cur.startDate]) {
          acc[cur.startDate] = [];
        }
        const bookingFormated = new GetAllBookingDTO(
          cur,
          cur.allocatable.resourseType,
        );
        acc[cur.startDate].push({ ...bookingFormated });
        return acc;
      },
      {} as Record<string, GetAllBookingDTO[]>,
    );

    return groupedEntities;
  }

  async getTimes(
    user: UserDTO,
    filters?: BookingFilterDTO,
  ): Promise<GetTimesUnavailableDTO[]> {
    const where: FindManyOptions<Booking>['where'] = {};

    where.userId = user.id;
    if (filters) {
      if (filters.startDate) where.startDate = filters.startDate;
      if (filters.allocatableId) where.allocatableId = filters.allocatableId;
    }

    const allEntities = await this.bookingRepository.find({
      where,
    });

    const groupedEntities = allEntities.map(
      (it) => new GetTimesUnavailableDTO(it),
    );

    return groupedEntities;
  }

  async delete(
    entityToDelete: number,
    loggedUser: UserDTO,
  ): Promise<number | null | undefined> {
    if (loggedUser.role !== 'admin') {
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
    }

    const deletedEntities = await this.bookingRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
