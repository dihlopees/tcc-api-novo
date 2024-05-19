import { Booking } from '../../entities/BookingEntity';

export class GetTimesUnavailableDTO {
  startTime: string;
  endTime: string;

  constructor(booking: Booking) {
    this.startTime = booking.startTime;
    this.endTime = booking.endTime;
  }
}
