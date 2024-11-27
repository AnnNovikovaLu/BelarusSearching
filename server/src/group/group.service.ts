import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { GroupUser } from 'src/group_user/group_user.model';
import { Group } from './group.model';
import { FilesService } from 'src/files/files.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group) private readonly groupModel: typeof Group,
    @InjectModel(GroupUser) private readonly groupUserModel: typeof GroupUser,
    private readonly fileService: FilesService,
  ) {}

  async createGroup(dto: CreateGroupDto, image): Promise<Group> {
    let fileName: string | null = null;
    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    const group = await this.groupModel.create({
      ...dto,
      image: fileName,
    });

    return group;
  }

  async getAllGroups(): Promise<Group[]> {
    return this.groupModel.findAll({ include: { all: true } });
  }

  async getGroupById(id: number): Promise<Group> {
    const group = await this.groupModel.findByPk(id, {
      include: { all: true },
    });
    if (!group) {
      throw new NotFoundException('Group not found');
    }
    return group;
  }

  async updateGroup(
    groupId: number,
    dto: UpdateGroupDto,
    image?,
  ): Promise<Group> {
    const group = await this.groupModel.findByPk(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (image) {
      if (group.image) {
        await this.fileService.deleteImage(group.image);
      }

      const fileName = await this.fileService.createImage(image);
      group.image = fileName;
    }

    if (dto.title) group.title = dto.title;
    if (dto.description) group.description = dto.description;

    await group.save();
    return group;
  }

  async deleteGroup(groupId: number): Promise<void> {
    const group = await this.groupModel.findByPk(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.image) {
      await this.fileService.deleteImage(group.image);
    }

    await group.destroy();
  }

  async addUserToGroup(groupId: number, userId: number): Promise<GroupUser> {
    const group = await this.groupModel.findByPk(groupId);
    if (!group) {
      throw new NotFoundException('Group not found');
    }

    const exists = await this.groupUserModel.findOne({
      where: { groupId, userId },
    });
    if (exists) {
      throw new ConflictException('User is already a member of this group');
    }

    return this.groupUserModel.create({ groupId, userId });
  }

  async removeUserFromGroup(groupId: number, userId: number): Promise<void> {
    const relation = await this.groupUserModel.findOne({
      where: { groupId, userId },
    });
    if (!relation) {
      throw new ConflictException('User is not a member of this group');
    }

    await relation.destroy();
  }
}
