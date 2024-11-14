import {
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/group.model';
import { Host } from 'src/host/host.model';
import { Review } from 'src/review/review.model';
import { User } from 'src/user/user.model';
import { Verification } from 'src/verification/verification.model';

interface GroupUserCreationAttrs {
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

@Table({ tableName: 'group_users' })
export class GroupUser extends Model<GroupUser, GroupUserCreationAttrs> {
  /* @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number; */

  @ForeignKey(() => Group)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;
}
