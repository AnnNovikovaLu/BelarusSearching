import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { VerifiedUserGuard } from 'src/Guards/verified.guard';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Post()
  create(@Body() createReviewDto: CreateReviewDto, @Request() req) {
    const userId = req.user.id;
    return this.reviewService.create(createReviewDto, userId);
  }

  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.reviewService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateReviewDto: UpdateReviewDto,
    @Request() req,
  ) {
    const userId = req.user.id;
    return this.reviewService.update(+id, updateReviewDto, userId);
  }

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    const userId = req.user.id;
    return this.reviewService.delete(+id, userId);
  }
}
