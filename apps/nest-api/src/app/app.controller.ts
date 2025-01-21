import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import {
  AuthGuard,
  RoleGuard,
  Roles,
  Public,
} from '@at-monorepo/security-guards';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthGuard, RoleGuard)
  @Roles('admin')
  getData() {
    return this.appService.getData();
  }

  @Get('/public')
  @UseGuards(AuthGuard)
  @Public()
  publicRoute() {
    console.log('Reach public');
    return { public: 'This is a public route' };
  }

  @Get('/private')
  @UseGuards(AuthGuard)
  privateRoute() {
    return { private: 'This is a private route' };
  }

  @Get('/prisma')
  @UseGuards(AuthGuard)
  @Public()
  prismaRoute() {
    return this.appService.findAllUsers();
  }

  @Get('/demo-user')
  @UseGuards(AuthGuard)
  @Public()
  demoUser() {
    return this.appService.demoUser();
  }
}
