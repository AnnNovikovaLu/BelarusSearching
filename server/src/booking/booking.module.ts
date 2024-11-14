import { Module } from '@nestjs/common';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Host } from 'src/host/host.model';
import { User } from 'src/user/user.model';
import { Booking } from './booking.model';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [SequelizeModule.forFeature([Booking, Host, User])],
})
export class BookingModule {}
