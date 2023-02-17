import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { ProjectsService } from './projects.service';
import { randomUUID } from 'node:crypto';
import { BadRequestException } from '@nestjs/common';

const validId = 'AAAAAAAAAAAAAAAAAAAAAAAA';

const mockProjects: Project[] = [
  {
    title: 'faladev-api',
    description: 'FalaDev API',
    repository: 'https://github.com/diego3g/faladev',
    id: randomUUID(),
    readme: '',
  },
  {
    title: 'portfolio-api',
    description: 'Portfolio API',
    repository: 'https://github.com/josesilveiraa/portfolio-api',
    id: randomUUID(),
    readme: '',
  },
];

const prismaMock = {
  project: {
    create: jest.fn().mockReturnValue(mockProjects[0]),
    findMany: jest.fn().mockReturnValue(mockProjects),
    findUnique: jest.fn().mockReturnValue(mockProjects[0]),
    update: jest.fn().mockReturnValue(mockProjects[0]),
    delete: jest.fn(),
  },
};

describe('ProjectsService', () => {
  let service: ProjectsService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectsService,
        { provide: PrismaService, useValue: prismaMock },
      ],
    }).compile();

    service = module.get<ProjectsService>(ProjectsService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a project', async () => {
      expect(
        service.create({
          title: 'faladev-api',
          description: 'FalaDev API',
          repository: 'https://github.com/diego3g/faladev',
          readme: '',
        }),
      ).resolves.toEqual(mockProjects[0]);
    });
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const projects = await service.findAll();

      expect(projects).toEqual(mockProjects);
    });
  });

  describe('findUnique', () => {
    it('should return a single project', async () => {
      const project = await service.findOne(validId);

      expect(project).toEqual(mockProjects[0]);
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const project = await service.update(validId, {
        title: 'faladev-api',
        description: 'FalaDev API',
        repository: 'https://github.com/diego3g/faladev',
        readme: '',
      });

      expect(project).toEqual(mockProjects[0]);
    });
  });

  describe('remove', () => {
    it('should fail when trying to remove a project', async () => {
      const spy = jest
        .spyOn(prisma.project, 'delete')
        .mockRejectedValueOnce(new BadRequestException('Invalid ID.'));

      expect(service.remove('invalid uuid')).rejects.toThrow();
      expect(service.remove('invalid uuid')).rejects.toBeInstanceOf(
        BadRequestException,
      );
    });
  });
});
