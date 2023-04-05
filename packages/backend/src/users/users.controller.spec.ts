import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories/users/users-repository';
import { InMemoryUsersRepository } from '../repositories/users/in-memory-users-repository';

describe('UsersController', () => {
  let controller: UsersController;
  let repository: UsersRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersRepository,
          useClass: InMemoryUsersRepository,
        },
      ],
    }).compile();

    controller = app.get<UsersController>(UsersController);
    repository = app.get<InMemoryUsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
