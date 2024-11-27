import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createActivityDto: CreateActivityDto,
    @UploadedFile() image,
  ) {
    return this.activityService.create(createActivityDto, image);
  }

  @Get()
  async findAll() {
    return this.activityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.activityService.findById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
    @UploadedFile() image,
  ) {
    return this.activityService.update(id, updateActivityDto, image);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: number) {
    return this.activityService.delete(id);
  }
}
