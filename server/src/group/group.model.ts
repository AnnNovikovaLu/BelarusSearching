import {
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { GroupUser } from 'src/group_user/group_user.model';
import { User } from 'src/user/user.model';

interface GroupCreationAttrs {
  city: string;
  address: string;
  guestCount: number;
}

@Table({ tableName: 'groups' })
export class Group extends Model<Group, GroupCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  tittle: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @BelongsToMany(() => User, () => GroupUser)
  users: User;
}
