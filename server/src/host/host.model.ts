import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { Booking } from 'src/booking/booking.model';
import { Review } from 'src/review/review.model';
import { User } from 'src/user/user.model';

interface HostCreationAttrs {
  city: string;
  address: string;
  guestCount: number;
  image: string;
  userId: number;
}

@Table({ tableName: 'hosts' })
export class Host extends Model<Host, HostCreationAttrs> {
  [x: string]: any;
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

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Booking)
  bookings: Booking[];

  @HasMany(() => Review)
  reviews: Review[];
}
