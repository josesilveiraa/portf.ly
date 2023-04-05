import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from './users-repository';
import { UserEntity } from 'src/users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';

interface UserUpdateData {
  email?: string;
  username?: string;
  password?: string;
}

export class InMemoryUsersRepository implements UsersRepository {
  private users: UserEntity[] = [];

  async create(data: CreateUserDto): Promise<UserEntity> {
    const user: UserEntity = {
      ...data,
      id: `user-${this.users.length + 1}`,
    };

    this.users.push(user);

    return user;
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
