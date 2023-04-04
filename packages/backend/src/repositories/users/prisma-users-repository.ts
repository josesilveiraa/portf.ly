import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
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
    return await this.prisma.user.create({
      data,
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: number): Promise<User> {
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

  async remove(targetId: number): Promise<User> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.user.delete({ where: { id } });
  }

  async update(targetId: number, data: UserUpdateData): Promise<User> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
