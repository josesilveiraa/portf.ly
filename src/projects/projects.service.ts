import {
  BadRequestException,
  HttpCode,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from '../database/prisma.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: CreateProjectDto): Promise<Project> {
    return this.prismaService.project.create({
      data,
    });
  }

  async findAll(): Promise<Project[]> {
    return this.prismaService.project.findMany();
  }

  async findOne(id: string): Promise<Project> {
    if (id.length !== 24) {
      throw new BadRequestException('`id` must be 24-character long.');
    }

    const project = await this.prismaService.project.findUnique({
      where: { id },
    });

    if (!project) throw new NotFoundException('User not found.');

    return project;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.findOne(id);

    return await this.prismaService.project.update({
      where: {
        id: project.id,
      },

      data: updateProjectDto,
    });
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(id: string) {
    const project = await this.findOne(id);

    await this.prismaService.project.delete({
      where: { id: project.id },
    });

    return;
  }
}
