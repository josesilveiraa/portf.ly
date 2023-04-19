import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '../../database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { UsersRepository } from '../repositories/users/users-repository';
import { PrismaUsersRepository } from '../repositories/users/prisma-users-repository';

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
