import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AdminUser } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { BadRequestException } from '@nestjs/common';

const validId = 'AAAAAAAAAAAAAAAAAAAAAAAA';

const mockUsers: AdminUser[] = [
  {
    id: 'firstId',
    email: 'johndoe@gmail.com',
    username: 'JohnDoe',
    password: 'johndoe123',
  },
  {
    id: 'secondId',
    email: 'janedoe@gmail.com',
    username: 'JaneDoe',
    password: 'janedoe123',
  },
];
const serviceMock = {
  create: jest.fn().mockImplementation((user: CreateUserDto) => {
    return Promise.resolve({ id: validId, ...user });
  }),
  findAll: jest.fn().mockResolvedValue(mockUsers),
  findOne: jest.fn().mockImplementation((id: string) => {
    return Promise.resolve({
      email: 'johndoe@gmail.com',
      username: 'johndoe',
      password: 'johndoe',
      id,
    });
  }),
  update: jest.fn().mockImplementation((id: string, user: CreateUserDto) => {
    return Promise.resolve({ id, ...user });
  }),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: serviceMock }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = controller.findAll();

      await expect(users).resolves.toEqual(mockUsers);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      await expect(controller.findOne('firstId')).resolves.toEqual({
        email: 'johndoe@gmail.com',
        username: 'johndoe',
        password: 'johndoe',
        id: 'firstId',
      });

      await expect(controller.findOne('secondId')).resolves.toEqual({
        email: 'johndoe@gmail.com',
        username: 'johndoe',
        password: 'johndoe',
        id: 'secondId',
      });
    });
  });

  describe('create', () => {
    it('should successfully create a new user', async () => {
      const user: CreateUserDto = {
        email: 'johndoe@gmail.com',
        password: 'johndoe',
        username: 'johndoe',
      };

      await expect(controller.create(user)).resolves.toEqual({
        id: validId,
        ...user,
      });
    });
  });

  describe('update', () => {
    it('should successfully update a cat', async () => {
      const user: CreateUserDto = {
        email: 'johndoe123@gmail.com',
        password: 'johndoe1234',
        username: 'JohnDoes',
      };

      await expect(controller.update(validId, user)).resolves.toEqual({
        id: validId,
        ...user,
      });
    });
  });

  describe('remove', () => {
    it('should return that it removed an user', async () => {
      await expect(controller.remove('uuid')).resolves.toEqual(undefined);
    });

    it("should return that it couldn't remove an user", async () => {
      const spy = jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new BadRequestException());

      await expect(controller.remove('invalid uuid')).rejects.toThrow();

      expect(spy).toBeCalledWith('invalid uuid');
    });
  });
});
