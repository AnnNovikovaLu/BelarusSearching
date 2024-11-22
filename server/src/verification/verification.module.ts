import { Module } from '@nestjs/common';
import { VerificationService } from './verification.service';
import { VerificationController } from './verification.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Verification } from './verification.model';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

@Module({
  controllers: [VerificationController],
  providers: [VerificationService],
  imports: [
    SequelizeModule.forFeature([Verification, User]),
    AuthModule,
    FilesModule,
  ],
})
export class VerificationModule {}
