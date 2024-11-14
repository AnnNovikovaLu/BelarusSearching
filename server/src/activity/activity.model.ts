import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface ActivityCreationAttrs {
  city: string;
  address: string;
  guestCount: number;
}

@Table({ tableName: 'activities' })
export class Activity extends Model<Activity, ActivityCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  city: string;

  @Column({ type: DataType.DATE, allowNull: false })
  datetime: string;

  @Column({ type: DataType.STRING, allowNull: false })
  tittle: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
}
