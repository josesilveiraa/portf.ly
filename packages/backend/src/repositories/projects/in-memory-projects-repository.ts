import { ProjectsRepository } from './projects-repository';
import { CreateProjectDto } from 'src/projects/dto/create-project.dto';
import { ProjectEntity } from 'src/projects/entities/project.entity';

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
      throw new Error(`Project ${id} not found`);
    }

    return project;
  }

  async update(
    targetId: string,
    updateData: ProjectUpdateData,
  ): Promise<ProjectEntity> {
    const projectIndex = this.projects.findIndex(
      (project) => project.id === targetId,
    );

    if (projectIndex < 0) {
      throw new Error(`Project with id ${targetId} not found`);
    }

    const updatedProject = {
      ...this.projects[projectIndex],
      ...updateData,
    };

    this.projects[projectIndex] = updatedProject;

    return updatedProject;
  }

  async remove(targetId: string): Promise<ProjectEntity> {
    const project = await this.findOne(targetId);
    const index = this.projects.findIndex((p) => p.id === project.id);

    this.projects.splice(index, 1);

    return project;
  }
}
