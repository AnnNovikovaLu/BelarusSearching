import { Module } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Activity } from './activity.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [ActivityController],
  providers: [ActivityService],
  imports: [SequelizeModule.forFeature([Activity]), FilesModule],
})
export class ActivityModule {}
