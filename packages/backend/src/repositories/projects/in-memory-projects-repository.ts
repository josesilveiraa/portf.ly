import { NotFoundException } from '@nestjs/common';
import { ProjectsRepository } from './projects-repository';
import { CreateProjectDto } from '../../projects/dto/create-project.dto';
import { ProjectEntity } from '../../projects/entities/project.entity';

interface ProjectUpdateData {
  title?: string;
  repository?: string;
  description?: string;
  readme?: string;
  previewImage?: string;
}

export class InMemoryProjectsRepository implements ProjectsRepository {
  private projects: ProjectEntity[] = [];

  async create(data: CreateProjectDto): Promise<ProjectEntity> {
    const project: ProjectEntity = {
      ...data,
      id: `project-${this.projects.length + 1}`,
    };

    this.projects.push(project);

    return project;
  }

  async findAll(): Promise<ProjectEntity[]> {
    return this.projects;
  }

  async findOne(id: string): Promise<ProjectEntity> {
    const project = this.projects.find((project) => project.id === id);

    if (!project) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    return project;
  }

  async update(
    targetId: string,
    updateData: ProjectUpdateData,
  ): Promise<ProjectEntity> {
    const project = await this.findOne(targetId);

    if (!project) {
      throw new NotFoundException(`Project ${targetId} not found`);
    }

    const projectIndex = this.projects.findIndex(
      (found) => found.id === project.id,
    );

    const updatedProject = {
      ...this.projects[projectIndex],
      ...updateData,
    };

    this.projects[projectIndex] = updatedProject;

    return updatedProject;
  }

  async remove(id: string): Promise<ProjectEntity> {
    const project = await this.findOne(id);

    if (!project) {
      throw new NotFoundException(`Project  ${id} not found`);
    }

    const index = this.projects.findIndex((p) => p.id === project.id);

    if (index < 0) {
      throw new NotFoundException(`Project ${id} not found`);
    }

    this.projects.splice(index, 1);

    return project;
  }
}
