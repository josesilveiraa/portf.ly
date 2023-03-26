import { User } from '@prisma/client';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

interface UserUpdateData {
  email?: string;
  username?: string;
  password?: string;
}

export abstract class UsersRepository {
  abstract create(data: CreateUserDto): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOne(id: string): Promise<User>;

  abstract update(id: string, data: UserUpdateData): Promise<User>;

  abstract remove(id: string): Promise<User>;
}
