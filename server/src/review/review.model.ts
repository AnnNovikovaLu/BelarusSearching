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

interface ReviewCreationAttrs {
  description: string;
  rating: number;
  authorId: number;
  hostId: number;
}

@Table({
  tableName: 'reviews',
  indexes: [
    {
      unique: true,
      fields: ['authorId', 'hostId'],
    },
  ],
})
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

  @Column({
    type: DataType.FLOAT,
    allowNull: false,
    validate: {
      min: 1,
      max: 10,
    },
  })
  rating: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  authorId: number;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => Host)
  @Column({ type: DataType.INTEGER, allowNull: false })
  hostId: number;

  @BelongsTo(() => Host)
  host: User;
}
