import { forwardRef, Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './user.model';
import { AuthModule } from 'src/auth/auth.module';
import { VerificationModule } from 'src/verification/verification.module';
import { Verification } from 'src/verification/verification.model';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [
    SequelizeModule.forFeature([User, Verification]),
    forwardRef(() => AuthModule),
  ],
  exports: [UserService],
})
export class UserModule {}
