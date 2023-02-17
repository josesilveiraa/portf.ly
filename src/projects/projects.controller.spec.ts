import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Project } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';

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

const serviceMock = {
  create: jest.fn().mockImplementation((project: CreateProjectDto) => {
    return Promise.resolve({ id: validId, ...project });
  }),
  findAll: jest.fn().mockResolvedValue(mockProjects),
  findOne: jest.fn().mockImplementation((id: string) => {
    return Promise.resolve({
      title: 'portfolio-api',
      description: 'Portfolio API',
      repository: 'https://github.com/josesilveiraa/portfolio-api',
      readme: '',
      id,
    });
  }),
  update: jest
    .fn()
    .mockImplementation((id: string, project: UpdateProjectDto) => {
      return Promise.resolve({ id, ...project });
    }),
  remove: jest.fn().mockResolvedValue(undefined),
};

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let service: ProjectsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [{ provide: ProjectsService, useValue: serviceMock }],
    }).compile();

    controller = module.get<ProjectsController>(ProjectsController);
    service = module.get<ProjectsService>(ProjectsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const projects = controller.findAll();

      await expect(projects).resolves.toEqual(mockProjects);
    });
  });

  describe('findOne', () => {
    it('should return a single user', async () => {
      await expect(controller.findOne('firstId')).resolves.toEqual({
        title: 'portfolio-api',
        description: 'Portfolio API',
        repository: 'https://github.com/josesilveiraa/portfolio-api',
        readme: '',
        id: 'firstId',
      });

      await expect(controller.findOne('secondId')).resolves.toEqual({
        title: 'portfolio-api',
        description: 'Portfolio API',
        repository: 'https://github.com/josesilveiraa/portfolio-api',
        readme: '',
        id: 'secondId',
      });
    });
  });

  describe('create', () => {
    it('should successfully create a new project', async () => {
      const project: CreateProjectDto = {
        title: 'portfolio-api',
        description: 'Portfolio API',
        repository: 'https://github.com/josesilveiraa/portfolio-api',
        readme: '',
      };

      await expect(controller.create(project)).resolves.toEqual({
        id: validId,
        ...project,
      });
    });
  });

  describe('update', () => {
    it('should successfully update a project', async () => {
      const project: CreateProjectDto = {
        title: 'portfolio-api',
        description: 'Portfolio API',
        repository: 'https://github.com/josesilveiraa/portfolio-api',
        readme: '',
      };

      await expect(controller.update(validId, project)).resolves.toEqual({
        id: validId,
        ...project,
      });
    });
  });

  describe('remove', () => {
    it('should return that it removed a project', async () => {
      await expect(controller.remove('uuid')).resolves.toEqual(undefined);
    });

    it("should return that it couldn't remove a project", async () => {
      const spy = jest
        .spyOn(service, 'remove')
        .mockRejectedValueOnce(new BadRequestException());

      await expect(controller.remove('invalid uuid')).rejects.toThrow();

      expect(spy).toBeCalledWith('invalid uuid');
    });
  });
});
