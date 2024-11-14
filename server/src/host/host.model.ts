import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface HostCreationAttrs {
  city: string;
  address: string;
  guestCount: number;
}

@Table({ tableName: 'hosts' })
export class Host extends Model<Host, HostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.STRING, allowNull: false })
  address: string;

  @Column({ type: DataType.INTEGER, allowNull: false })
  guestCount: number;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @BelongsTo(() => User)
  user: User;
}
