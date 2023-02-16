import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { AdminUser } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

export interface ExcludedUser {
  id: string;
  email: string;
  username: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<AdminUser> {
    return await this.prismaService.adminUser.create({ data: createUserDto });
  }

  async findAll(): Promise<ExcludedUser[]> {
    const users = await this.prismaService.adminUser.findMany({});
    const excluded = users.map((user) => this.exclude(user, ['password']));

    return excluded;
  }

  async findOne(id: string): Promise<ExcludedUser> {
    if (id.length !== 24) {
      throw new BadRequestException('`id` must be 24-character long.');
    }

    const user = await this.prismaService.adminUser.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const excluded = this.exclude(user, ['password']);

    return excluded;
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

  private exclude<AdminUser, Key extends keyof AdminUser>(
    user: AdminUser,
    keys: Key[],
  ): Omit<AdminUser, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
