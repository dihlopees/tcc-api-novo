import { AllocatableType } from '../../entities/AllocatableTypeEntity';
import { Booking } from '../../entities/BookingEntity';
import { ReservationHasExtras } from '../../entities/ReservationHasExtrasEntity';

export class GetAllBookingDTO {
  id: number;
  userId: number;
  startTime: string;
  title: string;
  endTime: string;
  startDate: string;
  endDate: string;
  note: string;
  bookedForUserId: number;
  reservationColor: string;
  courseId: number;
  allocatableId: number;
  createdAt: Date;
  updatedAt: Date;
  resourseType: number;
  extras?: BookingHasExtras[];

  constructor(
    booking: Booking,
    type: AllocatableType,
    extras: BookingHasExtras[],
  ) {
    this.id = booking.id;
    this.userId = booking.userId;
    this.startTime = booking.startTime;
    this.title = booking.title;
    this.endTime = booking.endTime;
    this.startDate = booking.startDate;
    this.endDate = booking.endDate;
    this.note = booking.note;
    this.bookedForUserId = booking.bookedForUserId;
    this.reservationColor = booking.reservationColor;
    this.courseId = booking.courseId;
    this.allocatableId = booking.allocatableId;
    this.createdAt = booking.createdAt;
    this.updatedAt = booking.updatedAt;
    this.resourseType = type.id;
    this.extras = extras;
  }
}

export class BookingHasExtras {
  id: number;
  quantity: number;

  constructor(extras: ReservationHasExtras) {
    this.id = extras.extraId;
    this.quantity = extras.reservedQuantity;
  }
}
