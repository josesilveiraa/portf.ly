import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/database/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UsersRepository } from 'src/repositories/user/users-repository';
import { PrismaUsersRepository } from 'src/repositories/user/prisma-users-repository';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    { provide: APP_GUARD, useClass: JwtAuthGuard },
  ],
  exports: [UsersService],
})
export class UsersModule {}
