import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './review.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review) private reviewModel: typeof Review) {}

  async create(
    createReviewDto: CreateReviewDto,
    userId: number,
  ): Promise<Review> {
    return await this.reviewModel.create({
      ...createReviewDto,
      authorId: userId,
    });
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewModel.findByPk(id, {
      include: { all: true },
    });
    if (!review) {
      throw new NotFoundException('Review not found');
    }
    return review;
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
    userId: number,
  ): Promise<Review> {
    const review = await this.findOne(id);

    if (review.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to edit this review');
    }

    await review.update(updateReviewDto);
    return review;
  }

  async delete(id: number, userId: number): Promise<void> {
    const review = await this.findOne(id);

    if (review.authorId !== userId) {
      throw new ForbiddenException('You are not allowed to delete this review');
    }

    await review.destroy();
  }
}
