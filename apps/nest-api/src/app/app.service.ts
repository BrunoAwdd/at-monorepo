import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { faker } from '@faker-js/faker';

@Injectable()
export class AppService {
  constructor(private readonly prismaService: PrismaService) {}

  getData(): { message: string; token: string } {
    return {
      message: 'Hello API',
      token: process.env.JWT_SECRET || 'empty',
    };
  }

  findAllUsers() {
    return this.prismaService.user.findMany();
  }

  demoUser() {
    return this.prismaService.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email().toLowerCase(),
      },
    });
  }
}
