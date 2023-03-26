import { User } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { UsersRepository } from './users-repository';

export class PrismaUsersRepository implements UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    username: string,
    email: string,
    password: string,
  ): Promise<User> {
    return await this.prisma.user.create({
      data: { username, email, password },
    });
  }

  async findAll(): Promise<User[]> {
    return await this.prisma.user.findMany();
  }

  async findOne(id: string): Promise<User> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async remove(id: string): Promise<User> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async update(
    id: string,
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: { email, username, password },
    });
  }
}
