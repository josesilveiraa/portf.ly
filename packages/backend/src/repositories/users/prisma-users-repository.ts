import { Injectable } from '@nestjs/common';
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

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }
  async findOneByEmail(email: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async update(id: string, data: UserUpdateData): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
