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
import { VerificationService } from './verification.service';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('verification')
export class VerificationController {
  constructor(private readonly verificationService: VerificationService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() dto: CreateVerificationDto,
    @Req() req: any,
    @UploadedFile() image,
  ) {
    const userId = req.user.id;
    return this.verificationService.create(dto, userId, image);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: any) {
    const userId = req.user.id;
    await this.verificationService.delete(+id, userId);
    return { message: 'Verification deleted successfully' };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateVerificationDto,
    @Req() req: any,
    @UploadedFile() image?,
  ) {
    const userId = req.user.id;
    return this.verificationService.update(+id, dto, userId, image);
  }

  @Get()
  async findAll() {
    return this.verificationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.verificationService.findOne(+id);
  }
}
