import {
  BelongsTo,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

interface VerificationCreationAttrs {
  phoneNumber: string;
  description: string;
  interests: string;
  photo: string;
}

@Table({ tableName: 'verifications' })
export class Verification extends Model<
  Verification,
  VerificationCreationAttrs
> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  phoneNumber: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  interests: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;

  @BelongsTo(() => User)
  user: User;
}
