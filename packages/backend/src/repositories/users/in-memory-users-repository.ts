import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UsersRepository } from './users-repository';
import { UserEntity } from '../../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

interface UserUpdateData {
  email?: string;
  username?: string;
  password?: string;
}

export class InMemoryUsersRepository implements UsersRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDto): Promise<void> {
    const user: UserEntity = {
      ...data,
      projects: [],
      id: `user-${this.users.length + 1}`,
    };

    this.users.push(user);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOne(id: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new NotFoundException(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: string, updateData: UserUpdateData): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const index = this.users.findIndex((target) => target.id === user.id);

    if (index < 0) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const updatedUser = {
      ...this.users[index],
      ...updateData,
    };

    this.users[index] = updatedUser;

    return updatedUser;
  }

  async remove(id: string): Promise<UserEntity> {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }

    const index = this.users.findIndex((u) => u.id === user.id);

    if (index < 0) {
      throw new NotFoundException(`User ${id} not found`);
    }

    this.users.splice(index, 1);

    return user;
  }
}
