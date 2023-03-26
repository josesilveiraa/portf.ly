import { Project } from '@prisma/client';

export abstract class ProjectsRepository {
  abstract create(
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project>;

  abstract findAll(): Promise<Project[]>;

  abstract findOne(id: string): Promise<Project>;

  abstract update(
    id: string,
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project>;

  abstract remove(id: string): Promise<Project>;
}
