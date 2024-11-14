import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Host } from 'src/host/host.model';
import { User } from 'src/user/user.model';

interface BookingCreationAttrs {
  city: string;
  address: string;
  guestCount: number;
}

@Table({ tableName: 'bookings' })
export class Booking extends Model<Booking, BookingCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.INTEGER, allowNull: false })
  guestCount: number;

  @BelongsTo(() => User)
  user: User;

  @BelongsTo(() => Host)
  host: Host;
}
