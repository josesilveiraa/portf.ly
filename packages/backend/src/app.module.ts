import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './shared/projects/projects.module';
import { UsersModule } from './shared/users/users.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { redisStore } from 'cache-manager-redis-yet';

@Module({
  imports: [
    ProjectsModule,
    UsersModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    CacheModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        store: await redisStore({
          url: configService.get<string>('REDIS_URL'),
          ttl: 5000,
        }),
      }),

      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [{ provide: APP_INTERCEPTOR, useClass: CacheInterceptor }],
})
export class AppModule {}
