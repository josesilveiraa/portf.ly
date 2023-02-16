import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [ProjectsModule, UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
