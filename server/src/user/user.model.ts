import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  HasOne,
  Model,
  Table,
} from 'sequelize-typescript';
import { Group } from 'src/group/group.model';
import { GroupUser } from 'src/group_user/group_user.model';
import { Host } from 'src/host/host.model';
import { Review } from 'src/review/review.model';
import { Verification } from 'src/verification/verification.model';

interface UserCreationAttrs {
  name: string;
  surname: string;
  dateOfBirth: string;
  email: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, allowNull: false })
  surname: string;

  @Column({ type: DataType.DATEONLY, allowNull: false })
  dateOfBirth: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @HasOne(() => Verification)
  verification: Verification;

  @HasMany(() => Host)
  hosts: Host[];

  @HasMany(() => Review)
  reviews: Review[];

  @BelongsToMany(() => Group, () => GroupUser)
  groups: Group[];
}
