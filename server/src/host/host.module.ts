import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Host } from './host.model';
import { User } from 'src/user/user.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';
import { Booking } from 'src/booking/booking.model';

@Module({
  controllers: [HostController],
  providers: [HostService],
  imports: [SequelizeModule.forFeature([Host, User, Booking]), FilesModule, AuthModule],
})
export class HostModule {}
