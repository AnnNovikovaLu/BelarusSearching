import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Host } from 'src/host/host.model';
import { User } from 'src/user/user.model';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [SequelizeModule.forFeature([Host, User])],
})
export class ReviewModule {}
