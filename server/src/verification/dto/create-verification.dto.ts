import { IsNotEmpty, IsString } from 'class-validator';

export class CreateVerificationDto {
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  interests: string;
}
