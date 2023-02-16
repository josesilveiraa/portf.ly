import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Project } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
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
    try {
      return await this.prismaService.project.findUniqueOrThrow({
        where: { id },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2023') throw new BadRequestException('Invalid ID.');

        if (e.code === 'P2025') throw new NotFoundException('User not found.');
      }
    }
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
