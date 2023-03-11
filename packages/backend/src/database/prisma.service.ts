import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();

    this.$use(async (params, next) => {
      if (params.action === 'create' && params.model === 'User') {
        const user = params.args.data;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);

        user.password = hash;
        params.args.data = user;
      }
      return await next(params);
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
