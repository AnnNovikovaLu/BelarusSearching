import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Verification } from './verification.model';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
  imports: [SequelizeModule.forFeature([Verification, User])],
})
export class VerificationModule {}
