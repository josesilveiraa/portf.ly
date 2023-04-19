import { Module } from '@nestjs/common';
import { ProjectsController } from './projects.controller';
import { PrismaService } from '../../database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { ProjectsRepository } from '../repositories/projects/projects-repository';
import { PrismaProjectsRepository } from '../repositories/projects/prisma-projects-repository';

@Module({
  controllers: [ProjectsController],
  providers: [
    PrismaService,
    { provide: ProjectsRepository, useClass: PrismaProjectsRepository },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class ProjectsModule {}
