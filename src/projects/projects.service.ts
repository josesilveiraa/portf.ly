import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Project } from '@prisma/client';
import { PrismaService } from 'src/database/prisma.service';
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

    const user = await this.prismaService.project.findUnique({ where: { id } });

    if (!user) throw new NotFoundException('User not found.');

    return user;
  }

  async update(
    id: string,
    updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    return await this.prismaService.project.update({
      where: {
        id,
      },

      data: updateProjectDto,
    });
  }

  async remove(id: string): Promise<Project> {
    return await this.prismaService.project.delete({
      where: {
        id,
      },
    });
  }
}
