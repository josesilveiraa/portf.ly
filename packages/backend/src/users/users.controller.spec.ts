import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersRepository } from '../repositories/users/users-repository';
import { InMemoryUsersRepository } from '../repositories/users/in-memory-users-repository';
import { UserEntity } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

const users: UserEntity[] = [
  {
    email: 'user1@test.com',
    username: 'user1',
    password: 'password1',
    id: 'user-1',
  },
  {
    email: 'user2@test.com',
    username: 'user2',
    password: 'password2',
    id: 'user-2',
  },
  {
    email: 'user3@test.com',
    username: 'user3',
    password: 'password3',
    id: 'user-3',
  },
];

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

    for (const user of users) {
      await repository.create(user);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return the created user', async () => {
      const userToCreate: CreateUserDto = {
        email: 'janedoe@gmail.com',
        username: 'janedoe',
        password: 'password',
      };

      const createdUser = {
        ...userToCreate,
        id: 'user-4',
      };

      jest.spyOn(repository, 'create').mockResolvedValueOnce(createdUser);

      const response = await controller.create(userToCreate);

      expect(repository.create).toHaveBeenCalledWith(userToCreate);
      expect(response).toEqual(createdUser);
    });
  });

  describe('findOne', () => {
    it('should return a user by id', async () => {
      const expectedUser = users[0];
      const actualUser = await controller.findOne(expectedUser.id);

      expect(actualUser).toBeDefined();
      expect(actualUser).toEqual(expectedUser);
    });

    it('should throw an error if user does not exist', async () => {
      const id = 'user-6';

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const allUsers = await controller.findAll();

      expect(allUsers).toHaveLength(users.length);
      expect(allUsers).toEqual(users);
      expect(Array.isArray(allUsers)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const userToUpdate = users[1];
      const updateData: UserEntity = {
        username: 'johnDoe',
        email: 'test@example.com',
        password: 'dummypassword',
        id: 'user-2',
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateData);

      const result = await controller.update(userToUpdate.id, updateData);

      expect(result).not.toEqual(userToUpdate);
      expect(repository.update).toHaveBeenCalledWith(
        userToUpdate.id,
        updateData,
      );
    });

    it('should throw an error if the user does not exist', async () => {
      const id = 'user-6';
      const updateData: UserEntity = {
        username: 'johnDoe',
        email: 'test@example.com',
        password: 'dummypassword',
        id: 'user-2',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(controller.update(id, updateData)).rejects.toThrow(
        NotFoundException,
      );
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const userToRemove = users[2];

      jest.spyOn(repository, 'findOne').mockResolvedValue(userToRemove);
      jest.spyOn(repository, 'remove').mockResolvedValue(userToRemove);

      const result = await controller.remove(userToRemove.id);

      await expect(controller.remove(userToRemove.id)).resolves.not.toThrow();
      expect(result).toEqual(userToRemove);
      expect(repository.remove).toHaveBeenCalledWith(userToRemove.id);
    });

    it('should throw an error if user does not exist', async () => {
      const id = 'user-6';

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });
});
