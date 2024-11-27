import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { Verification } from 'src/verification/verification.model';
import { Host } from 'src/host/host.model';
import { Review } from 'src/review/review.model';
import { Group } from 'src/group/group.model';
import { GroupUser } from 'src/group_user/group_user.model';
import { BookingModule } from 'src/booking/booking.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([
      User,
      Verification,
      Host,
      Review,
      Group,
      GroupUser,
    ]),
    forwardRef(() => AuthModule),
    BookingModule,
  ],
  exports: [UserService],
})
export class UserModule {}
