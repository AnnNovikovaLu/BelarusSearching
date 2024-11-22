import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateVerificationDto } from './dto/create-verification.dto';
import { UpdateVerificationDto } from './dto/update-verification.dto';
import { Verification } from './verification.model';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class VerificationService {
  constructor(
    @InjectModel(Verification) private verificationModel: typeof Verification,
    private fileService: FilesService,
  ) {}

  async create(
    dto: CreateVerificationDto,
    userId: number,
    image,
  ): Promise<Verification> {
    const existingVerification = await this.verificationModel.findOne({
      where: { userId },
    });
    if (existingVerification) {
      throw new UnauthorizedException(
        'Verification already exists for this user',
      );
    }

    let fileName: string | null = null;
    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    return await this.verificationModel.create({
      ...dto,
      userId,
      image: fileName,
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    const verification = await this.verificationModel.findByPk(id);
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    if (verification.userId !== userId) {
      throw new UnauthorizedException('You can delete only your verification');
    }
    if (verification.image) {
      await this.fileService.deleteImage(verification.image);
    }
    await verification.destroy();
  }

  async update(
    id: number,
    dto: UpdateVerificationDto,
    userId: number,
    image?,
  ): Promise<Verification> {
    const verification = await this.verificationModel.findByPk(id);
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    if (verification.userId !== userId) {
      throw new UnauthorizedException('You can update only your verification');
    }
    let fileName = verification.image;
    if (image) {
      if (verification.image) {
        await this.fileService.deleteImage(verification.image);
      }

      fileName = await this.fileService.createImage(image);
    }

    await verification.update({ ...dto, image: fileName });
    return verification;
  }

  async findAll(): Promise<Verification[]> {
    return await this.verificationModel.findAll();
  }

  async findOne(id: number): Promise<Verification> {
    const verification = await this.verificationModel.findByPk(id);
    if (!verification) {
      throw new NotFoundException('Verification not found');
    }
    return verification;
  }
}
