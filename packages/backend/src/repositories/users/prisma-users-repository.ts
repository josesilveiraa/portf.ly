import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersRepository } from './users-repository';

interface UserUpdateData {
  email?: string;
  username?: string;
  password?: string;
}

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDto): Promise<User> {
    const { email, username, password } = data;

    const userExists = await this.userExists(username, email);

    if (userExists) {
      throw new ConflictException(
        `An user with this email or this username already exists`,
      );
    }

    return await this.prisma.user.create({
      data: { email, username, password },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { id } });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async remove(targetId: string): Promise<User> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.user.delete({ where: { id } });
  }

  async update(targetId: string, data: UserUpdateData): Promise<User> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }

  async userExists(username: string, email: string): Promise<boolean> {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [{ username }, { email }],
      },
    });

    return user !== null;
  }
}
