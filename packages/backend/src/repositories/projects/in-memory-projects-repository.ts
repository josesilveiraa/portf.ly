import { Project } from '@prisma/client';
import { ProjectsRepository } from './projects-repository';
import { v4 as uuid } from 'uuid';

export class InMemoryProjectsRepository implements ProjectsRepository {
  projects: Project[] = [];

  create(
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project> {
    const id = uuid();
    const project = {
      id,
      title,
      repository,
      description,
      readme,
      previewImage,
    };

    this.projects.push(project);

    return Promise.resolve(project);
  }

  findAll(): Promise<Project[]> {
    return Promise.resolve(this.projects);
  }

  findOne(id: string): Promise<Project> {
    const project = this.projects.find((project) => project.id === id);

    if (project) {
      return Promise.resolve(project);
    }

    return Promise.reject(new Error(`Project ${id} not found`));
  }

  async update(
    id: string,
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project> {
    return this.findOne(id)
      .then((project) => {
        const updatedProject = {
          ...project,
          title,
          repository,
          description,
          readme,
          previewImage,
        };

        const index = this.projects.findIndex((project) => project.id === id);
        this.projects[index] = updatedProject;

        return Promise.resolve(updatedProject);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }

  async remove(id: string): Promise<Project> {
    return this.findOne(id)
      .then((project) => {
        const index = this.projects.indexOf(project);
        delete this.projects[index];

        return Promise.resolve(project);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  }
}
