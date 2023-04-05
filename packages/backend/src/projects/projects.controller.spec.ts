import { ProjectsRepository } from '../repositories/projects/projects-repository';
import { ProjectsController } from './projects.controller';
import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryProjectsRepository } from '../repositories/projects/in-memory-projects-repository';
import { ProjectEntity } from './entities/project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { NotFoundException } from '@nestjs/common';

const projects: ProjectEntity[] = [
  {
    title: 'Project 1',
    description: 'Project 1 description',
    readme: 'Project 1 README.md',
    repository: 'https://github.com/projects/project1',
    previewImage: 'https://google.com/img/project1.png',
    id: 'project-1',
  },
  {
    title: 'Project 2',
    description: 'Project 2 description',
    readme: 'Project 2 README.md',
    repository: 'https://github.com/projects/project2',
    previewImage: 'https://google.com/img/project2.png',
    id: 'project-2',
  },
  {
    title: 'Project 3',
    description: 'Project 3 description',
    readme: 'Project 3 README.md',
    repository: 'https://github.com/projects/project3',
    previewImage: 'https://google.com/img/project3.png',
    id: 'project-3',
  },
];

describe('ProjectsController', () => {
  let controller: ProjectsController;
  let repository: ProjectsRepository;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ProjectsController],
      providers: [
        {
          provide: ProjectsRepository,
          useClass: InMemoryProjectsRepository,
        },
      ],
    }).compile();

    controller = app.get<ProjectsController>(ProjectsController);
    repository = app.get<InMemoryProjectsRepository>(ProjectsRepository);

    for (const project of projects) {
      await repository.create(project);
    }
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should return the created project', async () => {
      const projectToCreate: CreateProjectDto = {
        title: 'My Project',
        description: 'My Project description',
        readme: 'My Project README.md',
        repository: 'https://github.com/projects/myproject',
        previewImage: 'https://google.com/img/myproject.png',
      };

      const createdProject = {
        ...projectToCreate,
        id: 'project-1',
      };

      jest.spyOn(repository, 'create').mockResolvedValueOnce(createdProject);

      const response = await controller.create(projectToCreate);

      expect(repository.create).toHaveBeenCalledWith(projectToCreate);
      expect(response).toEqual(createdProject);
    });
  });

  describe('findOne', () => {
    it('should return a project by id', async () => {
      const expectedProject = projects[0];
      const actualProject = await controller.findOne(expectedProject.id);

      expect(actualProject).toBeDefined();
      expect(actualProject).toEqual(expectedProject);
    });

    it('should throw an error if the project does not exist', async () => {
      const id = 'project-6';

      await expect(controller.findOne(id)).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return an array of projects', async () => {
      const allProjects = await controller.findAll();

      expect(allProjects).toHaveLength(projects.length);
      expect(allProjects).toEqual(projects);
      expect(Array.isArray(allProjects)).toBeTruthy();
    });
  });

  describe('update', () => {
    it('should update a project', async () => {
      const projectToUpdate = projects[1];
      const updateData: ProjectEntity = {
        title: 'Updated Project',
        description: 'Updated project description',
        repository: 'https://github.com/projects/updated-project',
        readme: 'Updated project README.md',
        previewImage: 'https://google.com/img/project-update.png',
        id: 'project-2',
      };

      jest.spyOn(repository, 'update').mockResolvedValueOnce(updateData);

      const result = await controller.update(projectToUpdate.id, updateData);

      expect(result).not.toEqual(projectToUpdate);
      expect(repository.update).toHaveBeenCalledWith(
        projectToUpdate.id,
        updateData,
      );
    });

    it('should throw an error if the project does not exist', async () => {
      const id = 'project-6';
      const updateData: ProjectEntity = {
        title: 'Updated Project',
        description: 'Updated project description',
        repository: 'https://github.com/projects/updated-project',
        readme: 'Updated project README.md',
        previewImage: 'https://google.com/img/project-update.png',
        id: 'project-2',
      };

      jest.spyOn(repository, 'findOne').mockResolvedValueOnce(undefined);

      await expect(controller.update(id, updateData)).rejects.toThrow(
        NotFoundException,
      );

      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });

  describe('remove', () => {
    it('should delete an user', async () => {
      const projectToRemove = projects[2];

      jest.spyOn(repository, 'findOne').mockResolvedValue(projectToRemove);
      jest.spyOn(repository, 'remove').mockResolvedValue(projectToRemove);

      const result = await controller.remove(projectToRemove.id);

      await expect(
        controller.remove(projectToRemove.id),
      ).resolves.not.toThrow();
      expect(result).toEqual(projectToRemove);
      expect(repository.remove).toHaveBeenCalledWith(projectToRemove.id);
    });

    it('should throw an error if the project does not exist', async () => {
      const id = 'project-6';

      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      await expect(controller.remove(id)).rejects.toThrow(NotFoundException);
      expect(repository.findOne).toHaveBeenCalledWith(id);
    });
  });
});
