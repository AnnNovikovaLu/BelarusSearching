import { BadRequestException, Injectable } from '@nestjs/common';
import { BookingService } from 'src/booking/booking.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ReportsService {
  constructor(
    private userService: UserService,
    private bookingService: BookingService,
  ) {}

  async generateBookingReportPdf(id: number, res: Response) {
    const booking = this.bookingService.getBookingById(id);

    if (!booking) {
      throw new BadRequestException('Booking not found');
    }
  }
}
