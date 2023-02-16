import { Test, TestingModule } from '@nestjs/testing';
import { AdminUser } from '@prisma/client';
import { UsersService } from './users.service';
import { randomUUID } from 'node:crypto';
import { PrismaService } from '../database/prisma.service';
import { BadRequestException } from '@nestjs/common';

const uuid = 'AAAAAAAAAAAAAAAAAAAAAAAA';

const mockUsers: AdminUser[] = [
  {
    id: randomUUID(),
    email: 'johndoe@gmail.com',
    username: 'JohnDoe',
    password: 'johndoe123',
  },
  {
    id: randomUUID(),
    email: 'janedoe@gmail.com',
    username: 'JaneDoe',
    password: 'janedoe123',
  },
];

const prismaMock = {
  adminUser: {
    create: jest.fn().mockReturnValue(mockUsers[0]),
    findMany: jest.fn().mockReturnValue(mockUsers),
    findUnique: jest.fn().mockReturnValue(mockUsers[0]),
    update: jest.fn().mockReturnValue(mockUsers[0]),
    delete: jest.fn(),
  },
};

describe('UsersService', () => {
  let service: UsersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = await service.findAll();
      expect(users).toEqual(mockUsers);
    });

    describe('findOne', () => {
      it('should get a single user', async () => {
        expect(service.findOne(uuid)).resolves.toEqual(mockUsers[0]);
      });
    });

    describe('create', () => {
      it('should successfully register an user', async () => {
        expect(
          service.create({
            email: 'johndoe@gmail.com',
            password: 'JohnDoe',
            username: 'johndoe123',
          }),
        ).resolves.toEqual(mockUsers[0]);
      });
    });

    describe('update', () => {
      it('should update an user', async () => {
        const user = await service.update(uuid, {
          email: 'johndoe@gmail.com',
          username: 'JohnDoe',
          password: 'johndoe123',
        });

        expect(user).toEqual(mockUsers[0]);
      });
    });

    describe('remove', () => {
      it('should fail a delete operation', () => {
        const spy = jest
          .spyOn(prisma.adminUser, 'delete')
          .mockRejectedValueOnce(new Error('Bad Delete Method.'));

        expect(service.remove('bad uuid')).rejects.toBeInstanceOf(
          BadRequestException,
        );
      });
    });
  });
});
