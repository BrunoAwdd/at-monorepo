// prisma.service.ts
import { PrismaClient } from '@at-monorepo/prisma/user';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(@Inject('DATABASE_URL') databaseUrl: string) {
    super({
      datasources: {
        db: {
          url: databaseUrl,
        },
      },
    });
  }
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
