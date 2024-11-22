import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Host } from 'src/host/host.model';
import { User } from 'src/user/user.model';

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Host)
  @Column({ type: DataType.INTEGER, allowNull: false })
  hostId: number;

  @BelongsTo(() => Host)
  host: Host;
}
