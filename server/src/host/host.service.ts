import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Host } from './host.model';
import { FilesService } from 'src/files/files.service';
import { CreateHostDto } from './dto/create-host.dto';
import { Op, Sequelize } from 'sequelize';
import { Booking } from 'src/booking/booking.model';
import { Review } from 'src/review/review.model';
import { Verification } from 'src/verification/verification.model';
import { User } from 'src/user/user.model';

interface GetAllHostsOptions {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  search?: string;
  filters?: string;
}

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

  async findAll(options: GetAllHostsOptions) {
    const {
      page = 1,
      limit = 3,
      sortBy = 'updatedAt',
      sortOrder = 'DESC',
      search,
      filters,
    } = options;

    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { city: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (filters) {
      const parsedFilters = JSON.parse(filters);

      if (
        parsedFilters.guestCountMin !== undefined ||
        parsedFilters.guestCountMax !== undefined
      ) {
        where.guestCount = {};
        if (parsedFilters.guestCountMin !== undefined)
          where.guestCount[Op.gte] = parsedFilters.guestCountMin;
        if (parsedFilters.guestCountMax !== undefined)
          where.guestCount[Op.lte] = parsedFilters.guestCountMax;
      }
    }

    const hosts = await this.hostModel.findAndCountAll({
      where,
      include: [{ all: true }],
      distinct: true,
      limit,
      offset,
      order: [[sortBy, sortOrder]],
    });

    return {
      data: hosts.rows,
      pagination: {
        total: hosts.count,
        current_page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(hosts.count / limit),
      },
    };
  }

  async findAvailableHosts(options: GetAllHostsOptions) {
    const {
      page = 1,
      limit = 3,
      sortBy = 'updatedAt',
      sortOrder = 'DESC',
      search,
      filters,
    } = options;

    const offset = (page - 1) * limit;

    const where: any = {};

    if (search) {
      where[Op.or] = [
        { city: { [Op.iLike]: `%${search}%` } },
        { address: { [Op.iLike]: `%${search}%` } },
      ];
    }

    if (filters) {
      const parsedFilters = JSON.parse(filters);

      if (
        parsedFilters.guestCountMin !== undefined ||
        parsedFilters.guestCountMax !== undefined
      ) {
        where.guestCount = {};
        if (parsedFilters.guestCountMin !== undefined)
          where.guestCount[Op.gte] = parsedFilters.guestCountMin;
        if (parsedFilters.guestCountMax !== undefined)
          where.guestCount[Op.lte] = parsedFilters.guestCountMax;
      }
    }

    const hosts = await this.hostModel.findAndCountAll({
      where: Sequelize.and(
        where,
        Sequelize.literal(`
          NOT EXISTS (
            SELECT 1
            FROM bookings
            WHERE "bookings"."hostId" = "Host"."id"
          )
        `),
      ),
      include: [
        {
          model: Booking,
          required: false,
        },
      ],
      limit,
      offset,
      order: [[sortBy, sortOrder]],
      distinct: true,
    });

    return {
      data: hosts.rows,
      pagination: {
        total: hosts.count,
        current_page: Number(page),
        limit: Number(limit),
        total_pages: Math.ceil(hosts.count / limit),
      },
    };
  }

  async findById(id: number): Promise<Host> {
    const host = await this.hostModel.findByPk(id, {
      include: [
        {
          model: User,
          include: [Verification],
        },
      ],
    });
    if (!host) {
      throw new NotFoundException('Host not found');
    }
    return host;
  }

  async findAllByUserId(userId: number): Promise<Host[]> {
    return this.hostModel.findAll({ where: { userId } });
  }

  async getHostReviews(id: number) {
    const host = await this.hostModel.findByPk(id, {
      include: { model: Review },
    });

    if (!host) {
      throw new NotFoundException('Host not found');
    }

    return host.reviews;
  }

  //

  async findHostDetailsById(id: number) {
    const host = await this.hostModel.findByPk(id, {
      include: [
        {
          model: User,
          include: [Verification], // Включаем верификацию пользователя
        },
      ],
    });

    if (!host) {
      throw new NotFoundException('Host not found');
    }

    return host; // Возвращаем информацию о квартире и хозяине
  }

  async findAllHostsWithDetails() {
    const hosts = await this.hostModel.findAll({
      include: [
        {
          model: User,
          include: [Verification], // Включаем верификацию пользователя
        },
      ],
    });

    return hosts; // Возвращаем массив квартир с информацией о хозяевах
  }
}
