import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Host } from './host.model';
import { FilesService } from 'src/files/files.service';
import { CreateHostDto } from './dto/create-host.dto';
import { Sequelize } from 'sequelize';
import { Booking } from 'src/booking/booking.model';

@Injectable()
export class HostService {
  constructor(
    @InjectModel(Host) private readonly hostModel: typeof Host,
    private readonly fileService: FilesService,
  ) {}

  async create(
    createHostDto: CreateHostDto,
    userId: number,
    image,
  ): Promise<Host> {
    let fileName: string | null = null;
    if (image) {
      fileName = await this.fileService.createImage(image);
    }

    return this.hostModel.create({
      ...createHostDto,
      userId,
      image: fileName,
    });
  }

  async delete(id: number, userId: number): Promise<void> {
    const host = await this.hostModel.findByPk(id);
    if (!host) {
      throw new NotFoundException('Host not found');
    }

    if (host.userId !== userId) {
      throw new UnauthorizedException('You can delete only your hosts');
    }

    if (host.image) {
      await this.fileService.deleteImage(host.image);
    }

    await host.destroy();
  }

  async findAll(): Promise<Host[]> {
    return this.hostModel.findAll();
  }

  async findAvailableHosts(): Promise<Host[]> {
    return this.hostModel.findAll({
      include: [
        {
          model: Booking,
          required: false,
        },
      ],
      where: Sequelize.where(Sequelize.col('bookings.id'), null),
    });
  }

  async findById(id: number): Promise<Host> {
    const host = await this.hostModel.findByPk(id);
    if (!host) {
      throw new NotFoundException('Host not found');
    }
    return host;
  }

  async findAllByUserId(userId: number): Promise<Host[]> {
    return this.hostModel.findAll({ where: { userId } });
  }
}
