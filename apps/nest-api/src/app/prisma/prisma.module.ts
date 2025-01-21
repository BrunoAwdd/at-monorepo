import { DynamicModule, Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({})
export class PrismaModule {
  static forRoot(options?: { databaseUrl: string }): DynamicModule {
    return {
      module: PrismaModule,
      providers: [
        {
          provide: 'DATABASE_URL',
          useValue: options?.databaseUrl || process.env.DATABASE_URL,
        },
        PrismaService,
      ],
      exports: [PrismaService],
    };
  }
}
