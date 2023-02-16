import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminUser } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<AdminUser> {
    return await this.prismaService.adminUser.create({ data: createUserDto });
  }

  async findAll(): Promise<AdminUser[]> {
    return await this.prismaService.adminUser.findMany();
  }

  async findOne(id: string): Promise<AdminUser> {
    if (id.length !== 24) {
      throw new BadRequestException('`id` must be 24-character long.');
    }

    const user = await this.prismaService.adminUser.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<AdminUser> {
    const user = await this.findOne(id);

    return await this.prismaService.adminUser.update({
      where: { id: user.id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<AdminUser> {
    const user = await this.findOne(id);

    return await this.prismaService.adminUser.delete({
      where: { id: user.id },
    });
  }
}
