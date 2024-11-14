import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupUser } from 'src/group_user/group_user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Group } from './group.model';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [SequelizeModule.forFeature([Group, User, GroupUser])],
})
export class GroupModule {}
