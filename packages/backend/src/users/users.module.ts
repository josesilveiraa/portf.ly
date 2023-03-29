import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersRepository } from 'src/repositories/users/users-repository';
import { PrismaUsersRepository } from 'src/repositories/users/prisma-users-repository';

@Module({
  controllers: [UsersController],
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
})
export class UsersModule {}
