import { User } from '@prisma/client';

export abstract class UsersRepository {
  abstract create(
    username: string,
    email: string,
    password: string,
  ): Promise<User>;

  abstract findAll(): Promise<User[]>;

  abstract findOne(id: string): Promise<User>;

  abstract update(
    id: string,
    email: string,
    username: string,
    password: string,
  ): Promise<User>;

  abstract remove(id: string): Promise<User>;
}
