import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/group.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'group_users', createdAt: false, updatedAt: false })
export class GroupUser extends Model<GroupUser> {
  @ForeignKey(() => Group)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  groupId: number;

  @ForeignKey(() => User)
  @PrimaryKey
  @Column({ type: DataType.INTEGER })
  userId: number;
}
