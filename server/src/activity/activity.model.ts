import { Column, DataType, Model, Table } from 'sequelize-typescript';

interface ActivityCreationAttrs {
  city: string;
  datetime: string;
  title: string;
  description: string;
  image: string;
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
  title: string;

  @Column({ type: DataType.TEXT, allowNull: false })
  description: string;

  @Column({ type: DataType.STRING, allowNull: false })
  image: string;
}
