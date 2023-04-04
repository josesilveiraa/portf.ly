import { Project } from '@prisma/client';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';

interface ProjectUpdateData {
  title?: string;
  repository?: string;
  description?: string;
  readme?: string;
  previewImage?: string;
}

export abstract class ProjectsRepository {
  abstract create(data: CreateProjectDto): Promise<Project>;

  abstract findAll(): Promise<Project[]>;

  abstract findOne(id: number): Promise<Project>;

  abstract update(id: number, updateData: ProjectUpdateData): Promise<Project>;

  abstract remove(id: number): Promise<Project>;
}
