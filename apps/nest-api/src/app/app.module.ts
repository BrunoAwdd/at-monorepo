import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SecurityModule } from '@at-monorepo/security-guards';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    PrismaModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true }),
    SecurityModule.forRoot({
      jwtOptions: {
        secret: process.env.JWT_SECRET || '',
        signOptions: { expiresIn: '60m' },
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
