import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/user/user.model';
import { Review } from './review.model';

@Module({
  controllers: [ReviewController],
  providers: [ReviewService],
  imports: [SequelizeModule.forFeature([Review, User])],
})
export class ReviewModule {}
