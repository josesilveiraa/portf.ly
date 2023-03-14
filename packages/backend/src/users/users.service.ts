import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
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

  async create(createUserDto: CreateUserDto): Promise<ExcludedUser> {
    const existingUser = await this.findOneByEmail(createUserDto.email);

    if (existingUser) {
      throw new ConflictException('An user with this email already exists.');
    }

    const createdUser = await this.prismaService.user.create({
      data: createUserDto,
    });
    const excludedUser = this.exclude(createdUser, ['password']);

    return excludedUser;
  }

  async findAll(): Promise<ExcludedUser[]> {
    const users = await this.prismaService.user.findMany({});
    const excluded = users.map((user) => this.exclude(user, ['password']));

    return excluded;
  }

  async findOne(id: string): Promise<ExcludedUser> {
    if (id.length !== 24) {
      throw new BadRequestException('`id` must be 24-character long.');
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const excluded = this.exclude(user, ['password']);

    return excluded;
  }

  async findOneByEmail(email: string): Promise<ExcludedUser> {
    const user = await this.prismaService.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const excluded = this.exclude(user, ['password']);

    return excluded;
  }

  async update(
    providedId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<ExcludedUser> {
    const { id } = await this.findOne(providedId);

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });

    const excludedUser = this.exclude(updatedUser, ['password']);

    return excludedUser;
  }

  async remove(providedId: string) {
    const { id } = await this.findOne(providedId);

    await this.prismaService.user.delete({
      where: { id },
    });

    return;
  }

  private exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
