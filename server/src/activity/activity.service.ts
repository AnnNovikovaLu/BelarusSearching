import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Activity } from './activity.model';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ActivityService {
  constructor(
    @InjectModel(Activity) private activityModel: typeof Activity,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createActivityDto: CreateActivityDto,
    image,
  ): Promise<Activity> {
    let fileName: string | null = null;
    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    return this.activityModel.create({ ...createActivityDto, image: fileName });
  }

  async findAll(): Promise<Activity[]> {
    return this.activityModel.findAll();
  }

  async findById(id: number): Promise<Activity> {
    const activity = await this.activityModel.findByPk(id);
    if (!activity) {
      throw new NotFoundException(`Activity with ID ${id} not found`);
    }
    return activity;
  }

  async update(
    id: number,
    updateActivityDto: UpdateActivityDto,
    image?,
  ): Promise<Activity> {
    const activity = await this.activityModel.findByPk(id);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
  
    let fileName = activity.image;
    if (image) {
      if (activity.image) {
        await this.fileService.deleteImage(activity.image);
      }
      fileName = await this.fileService.createImage(image);
    }
  
    await activity.update({ ...updateActivityDto, image: fileName });
    return activity;
  }

  async delete(id: number): Promise<void> {
    const activity = await this.activityModel.findByPk(id);
    if (!activity) {
      throw new NotFoundException('Activity not found');
    }
    if (activity.image) {
      await this.fileService.deleteImage(activity.image);
    }
    await activity.destroy();
  }
}
