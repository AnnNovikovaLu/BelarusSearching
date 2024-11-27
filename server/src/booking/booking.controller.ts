import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BookingService } from './booking.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { CreateBookingDto } from './dto/create-booking.dto';
import { VerifiedUserGuard } from 'src/Guards/verified.guard';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Post()
  create(@Body() createBookingDto: CreateBookingDto, @Req() req) {
    const userId = req.user.id;
    return this.bookingService.createBooking(createBookingDto, userId);
  }

  @Get()
  getAllBookings() {
    return this.bookingService.getAllBookings();
  }

  @Get(':id')
  getBookingById(@Param('id') id: number) {
    return this.bookingService.getBookingById(id);
  }

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Delete(':id')
  deleteBooking(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;
    return this.bookingService.deleteBooking(id, userId);
  }
}
