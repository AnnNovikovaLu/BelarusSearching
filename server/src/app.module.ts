import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/user.model';
import { ServeStaticModule } from '@nestjs/serve-static';
import { FilesModule } from './files/files.module';
import { ReportsModule } from './reports/reports.module';
import { VerificationModule } from './verification/verification.module';
import { HostModule } from './host/host.module';
import { ReviewModule } from './review/review.module';
import { BookingModule } from './booking/booking.module';
import * as path from 'path';
import { Verification } from './verification/verification.model';
import { Host } from './host/host.model';
import { Review } from './review/review.model';
import { Booking } from './booking/booking.model';
import { ActivityModule } from './activity/activity.module';
import { GroupModule } from './group/group.module';
import { Group } from './group/group.model';
import { GroupUser } from './group_user/group_user.model';
import { Activity } from './activity/activity.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, '..', 'static'),
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRESS_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRESS_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [
        User,
        Verification,
        Host,
        Review,
        Booking,
        Activity,
        Group,
        GroupUser,
      ],
      autoLoadModels: true,
    }),
    UserModule,
    FilesModule,
    ReportsModule,
    VerificationModule,
    HostModule,
    ReviewModule,
    BookingModule,
    ActivityModule,
    GroupModule,
  ],
})
export class AppModule {}
