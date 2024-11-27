import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { GroupUser } from 'src/group_user/group_user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Group } from './group.model';
import { FilesModule } from 'src/files/files.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [GroupController],
  providers: [GroupService],
  imports: [
    SequelizeModule.forFeature([Group, User, GroupUser]),
    FilesModule,
    AuthModule,
  ],
})
export class GroupModule {}
