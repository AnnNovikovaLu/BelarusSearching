import { IsNotEmpty, IsInt } from 'class-validator';

export class CreateBookingDto {
  @IsNotEmpty()
  @IsInt()
  hostId: number;
}
