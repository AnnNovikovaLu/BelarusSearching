import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface ReviewCreationAttrs {
  description: string;
  rating: number;
}

@Table({ tableName: 'reviews' })
export class Review extends Model<Review, ReviewCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.FLOAT, allowNull: false })
  rating: number;

  @BelongsTo(() => User)
  user: User;
}
