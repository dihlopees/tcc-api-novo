import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { JoiPipe } from 'nestjs-joi';
import { BookingFilterDTO } from '../dtos/booking/BookingFilterDTO';
import { CreateBookingDTO } from '../dtos/booking/CreateBookingDTO';
import { EditBookingDTO } from '../dtos/booking/EditBookingDTO';
import { HttpExceptionDTO } from '../helpers/HttpExceptionDTO';
import { ReqUserDTO } from '../helpers/ReqUserDTO';
import { ResponseDTO } from '../helpers/ResponseDTO';
import { BookingService } from '../services/BookingService';

@Controller('booking')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  async create(
    @Body(JoiPipe) booking: CreateBookingDTO,
    @Req() request: ReqUserDTO,
  ) {
    const entityCreated = await this.bookingService.create(
      booking,
      request.user,
    );
    return new ResponseDTO(HttpStatus.OK, 'Criado', entityCreated);
  }

  @Patch('/:id')
  async edit(
    @Param('id') id: number,
    @Body(JoiPipe) entityToUpdate: EditBookingDTO,
    @Req() request: ReqUserDTO,
  ) {
    const entityEdited = await this.bookingService.update(
      id,
      entityToUpdate,
      request.user,
    );
    return new ResponseDTO(
      HttpStatus.OK,
      'Atualizado com sucesso',
      entityEdited.affected,
    );
  }

  @Get('/all')
  async getAll(
    @Query() bookingFilter: BookingFilterDTO,
    @Req() request: ReqUserDTO,
  ) {
    console.log(request.user);
    const allEntities = await this.bookingService.getAll(
      request.user,
      bookingFilter,
    );

    return new ResponseDTO(HttpStatus.OK, 'Encontrados', allEntities);
  }

  @Get('/one/:id')
  async getOne(@Param('id') getEntity: number, @Req() request: ReqUserDTO) {
    const entityFound = await this.bookingService.getOne(
      getEntity,
      request.user,
    );
    return new ResponseDTO(HttpStatus.OK, 'Encontrado', entityFound);
  }

  @Delete('/:id')
  async delete(@Param('id') deleteEntity: number, @Req() request: ReqUserDTO) {
    try {
      await this.bookingService.delete(deleteEntity, request.user);
      return new ResponseDTO(HttpStatus.OK, 'Deletado');
    } catch (err) {
      throw HttpExceptionDTO.error(`Not deleted`, err, HttpStatus.BAD_REQUEST);
    }
  }
}
