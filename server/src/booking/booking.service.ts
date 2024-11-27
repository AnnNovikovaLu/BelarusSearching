import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Booking } from './booking.model';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking) private readonly bookingRepository: typeof Booking,
  ) {}

  async createBooking(createBookingDto: CreateBookingDto, userId: number) {
    const { hostId } = createBookingDto;

    const existingBooking = await this.bookingRepository.findOne({
      where: { hostId },
    });

    if (existingBooking) {
      throw new ForbiddenException('This host already has a booking.');
    }

    return await this.bookingRepository.create({
      ...createBookingDto,
      userId,
    });
  }

  async getAllBookings() {
    return await this.bookingRepository.findAll({ include: { all: true } });
  }

  async getBookingById(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      include: { all: true },
    });
    if (!booking) {
      throw new NotFoundException('Booking not found');
    }
    return booking;
  }

  async deleteBooking(id: number, userId: number) {
    const booking = await this.bookingRepository.findOne({ where: { id } });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    if (booking.userId !== userId) {
      throw new ForbiddenException('You can only delete your own bookings');
    }

    await booking.destroy();
    return { message: 'Booking deleted successfully' };
  }
}
