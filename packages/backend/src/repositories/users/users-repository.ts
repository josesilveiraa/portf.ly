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

  abstract findOne(id: number): Promise<User>;

  abstract findOneByEmail(email: string): Promise<User>;

  abstract update(id: number, data: UserUpdateData): Promise<User>;

  abstract remove(id: number): Promise<User>;
}
