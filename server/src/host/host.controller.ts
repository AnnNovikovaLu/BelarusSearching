import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { HostService } from './host.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { CreateHostDto } from './dto/create-host.dto';
import { VerifiedUserGuard } from 'src/Guards/verified.guard';

@Controller('hosts')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
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

  @UseGuards(JwtAuthGuard, VerifiedUserGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    return this.hostService.delete(id, userId);
  }

  @Get()
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
    @Query('filters') filters?: string,
  ) {
    return this.hostService.findAll({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      filters,
    });
  }

  @Get('available')
  async findAvailableHosts(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'ASC' | 'DESC',
    @Query('search') search?: string,
    @Query('filters') filters?: string,
  ) {
    return this.hostService.findAvailableHosts({
      page,
      limit,
      sortBy,
      sortOrder,
      search,
      filters,
    });
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

  @Get(':id/reviews')
  getUserBookings(@Param('id') id: number) {
    return this.hostService.getHostReviews(id);
  }
}
