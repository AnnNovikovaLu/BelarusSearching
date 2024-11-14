import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.model';
import { JwtAuthGuard } from 'src/Guards/jwt-auth.guard';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  getAll() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.userService.getUserById(id);
  }

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
  ) {
    const userId = req.user.id;
    const parsedId = parseInt(id, 10);

    if (isNaN(parsedId)) {
      throw new BadRequestException('Invalid user ID');
    }

    if (userId !== parsedId) {
      throw new ForbiddenException('You can update only your own profile');
    }

    return this.userService.updateUser(userId, updateUserDto);
  }
}
