import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from './users-repository';
import { UserEntity } from 'src/users/entities/user.entity';

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
      id: this.users.length + 1,
    };

    this.users.push(user);

    return user;
  }

  async findAll(): Promise<UserEntity[]> {
    return this.users;
  }

  async findOne(id: number): Promise<UserEntity> {
    if (isNaN(id)) {
      throw new Error('id must be a number');
    }

    const user = this.users.find((user) => user.id === id);

    if (!user) {
      throw new Error(`User ${id} not found`);
    }

    return user;
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return user;
  }

  async update(id: number, updateData: UserUpdateData): Promise<UserEntity> {
    const index = this.users.findIndex((user) => user.id === id);

    if (index < 0) {
      throw new Error(`User with id ${id} not found`);
    }

    const updatedUser = {
      ...this.users[index],
      ...updateData,
    };

    this.users[index] = updatedUser;

    return updatedUser;
  }

  async remove(id: number): Promise<UserEntity> {
    const user = await this.findOne(id);
    const index = this.users.findIndex((u) => u.id === user.id);

    this.users.splice(index, 1);

    return user;
  }
}
