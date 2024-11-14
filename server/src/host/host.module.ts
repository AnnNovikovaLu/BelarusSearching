import { Module } from '@nestjs/common';
import { HostService } from './host.service';
import { HostController } from './host.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Host } from './host.model';
import { User } from 'src/user/user.model';

@Module({
  controllers: [HostController],
  providers: [HostService],
  imports: [SequelizeModule.forFeature([Host, User])],
})
export class HostModule {}
