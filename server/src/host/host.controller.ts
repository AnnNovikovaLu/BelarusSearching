import { Body, Controller, Delete, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { HostService } from './host.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { CreateHostDto } from './dto/create-host.dto';

@Controller('hosts')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createHostDto: CreateHostDto,
    @Req() req: any,
    @UploadedFile() image,
  ) {
    const userId = req.user.id;
    return this.hostService.create(createHostDto, userId, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.hostService.delete(id, userId);
  }

  @Get()
  async findAll() {
    return this.hostService.findAll();
  }

  @Get('available')
  async findAvailableHosts() {
    return this.hostService.findAvailableHosts();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.hostService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:userId')
  async findAllByUserId(@Param('userId') userId: number) {
    return this.hostService.findAllByUserId(userId);
  }
}
