import { Project } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
import { ProjectsRepository } from './projects-repository';

export class PrismaProjectsRepository implements ProjectsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project> {
    return await this.prisma.project.create({
      data: { title, repository, description, readme, previewImage },
    });
  }

  async findAll(): Promise<Project[]> {
    return await this.prisma.project.findMany();
  }

  async findOne(id: string): Promise<Project> {
    return await this.prisma.project.findUnique({ where: { id } });
  }

  async update(
    id: string,
    title: string,
    repository: string,
    description: string,
    readme: string,
    previewImage: string,
  ): Promise<Project> {
    return await this.prisma.project.update({
      where: { id },
      data: { title, repository, description, readme, previewImage },
    });
  }

  async remove(id: string): Promise<Project> {
    return await this.prisma.project.delete({ where: { id } });
  }
}
