import { User } from '@prisma/client';
import { UsersRepository } from './users-repository';
import { v4 as uuid } from 'uuid';

export class InMemoryUsersRepository implements UsersRepository {
  users: User[] = [];

  create(username: string, email: string, password: string): Promise<User> {
    const id = uuid();
    const user = { id, username, email, password };
    this.users.push(user);

    return Promise.resolve(user);
  }

  findAll(): Promise<User[]> {
    return Promise.resolve(this.users);
  }

  findOne(id: string): Promise<User> {
    const user = this.users.find((u) => u.id === id);

    if (user) {
      return Promise.resolve(user);
    }

    return Promise.reject(new Error(`User ${id} not found`));
  }

  update(
    id: string,
    email: string,
    username: string,
    password: string,
  ): Promise<User> {
    return this.findOne(id)
      .then((user) => {
        const updatedUser = { ...user, email, username, password };
        const index = this.users.findIndex((u) => u.id === id);
        this.users[index] = updatedUser;
        return Promise.resolve(updatedUser);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  remove(id: string): Promise<User> {
    this.findOne(id)
      .then((user) => {
        const index = this.users.indexOf(user);
        delete this.users[index];

        return Promise.resolve(user);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    return Promise.reject(new Error('Could not remove'));
  }
}
