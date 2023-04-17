import { Injectable, NotFoundException } from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../../database/prisma.service';
import { CreateProjectDto } from '../../projects/dto/create-project.dto';
import { ProjectsRepository } from './projects-repository';

interface ProjectUpdateData {
  title?: string;
  repository?: string;
  description?: string;
  readme?: string;
  previewImage?: string;
}

@Injectable()
export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProjectDto): Promise<void> {
    await this.prisma.project.create({
      data,
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project> {
    const project = await this.prisma.project.findUnique({ where: { id } });

    if (!project) {
      throw new NotFoundException(`Project with id ${id} not found`);
    }

    return project;
  }

  async update(
    targetId: string,
    updateData: ProjectUpdateData,
  ): Promise<Project> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.project.update({
      where: { id },
      data: updateData,
    });
  }

  async remove(targetId: string): Promise<Project> {
    const { id } = await this.findOne(targetId);

    return await this.prisma.project.delete({ where: { id } });
  }
}
