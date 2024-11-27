import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { GroupService } from './group.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';

@Controller('groups')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createGroup(
    @Body() dto: CreateGroupDto,
    @Req() req: any,
    @UploadedFile() image,
  ) {
    return this.groupService.createGroup(dto, image);
  }

  @Get()
  async getAllGroups() {
    return this.groupService.getAllGroups();
  }

  @Get(':id')
  async getGroupById(@Param('id') id: number) {
    return this.groupService.getGroupById(id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async updateGroup(
    @Param('id') groupId: number,
    @Body() dto: UpdateGroupDto,
    @UploadedFile() image?,
  ) {
    return this.groupService.updateGroup(groupId, dto, image);
  }

  @Delete(':id')
  async deleteGroup(@Param('id') groupId: number) {
    return this.groupService.deleteGroup(groupId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/join')
  async joinGroup(@Param('id') groupId: number, @Req() req: any) {
    const userId = req.user.id;
    return this.groupService.addUserToGroup(groupId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/leave')
  async leaveGroup(@Param('id') groupId: number, @Req() req: any) {
    const userId = req.user.id;
    return this.groupService.removeUserFromGroup(groupId, userId);
  }
}
