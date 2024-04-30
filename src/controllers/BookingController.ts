import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { EditBookingDTO } from '../dtos/booking/CreateBookingDTO copy';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { BookingService } from '../services/BookingService';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(@Body(JoiPipe) booking: CreateBookingDTO) {
    const entityCreated = await this.bookingService.create(booking);
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch('/:id')
  async edit(
    @Param('id') id: number,
    @Body(JoiPipe) entityToUpdate: EditBookingDTO,
  ) {
    const entityEdited = await this.bookingService.update(id, entityToUpdate);
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll() {
    const allEntities = await this.bookingService.getAll();

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number) {
    const entityFound = await this.bookingService.getOne(getEntity);
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(@Param('id') deleteEntity: number) {
    try {
      await this.bookingService.delete(deleteEntity, 11);
      return new ResponseDTO(HttpStatus.OK, 'Deletado');
    } catch (err) {
      throw HttpExceptionDTO.error(`Not deleted`, err, HttpStatus.BAD_REQUEST);
    }
  }
}
