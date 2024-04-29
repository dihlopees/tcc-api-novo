import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { Booking } from '../entities/BookingEntity';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
  ) {}

  async create(unit: CreateBookingDTO): Promise<Booking> {
    return await this.bookingRepository.save(unit);
  }

  async update(id: number, unit: any) {
    // return await this.unitRepository.update(id, { name: unit.name });
  }

  async getOne(user: number) {
    const entityFound = await this.bookingRepository.findOneBy({
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
    const allEntities = await this.bookingRepository.find();

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
    const deletedEntities = await this.bookingRepository.delete(entityToDelete);
    return deletedEntities.affected;
  }
}
