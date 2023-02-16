import { Module } from '@nestjs/common';
import { PrismaService } from './database/prisma.service';
import { ProjectsModule } from './projects/projects.module';

@Module({
  imports: [ProjectsModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
