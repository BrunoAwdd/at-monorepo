import { DynamicModule, Global, Module } from '@nestjs/common';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/roles.guard';
import { SecurityService } from './security.service';

interface SecurityModuleOptions {
  jwtOptions: {
    secret: string; // Você pode passar a chave secreta aqui
    signOptions?: {
      expiresIn?: string;
    };
  };
}

@Global()
@Module({})
export class SecurityModule {
  static forRoot(options: SecurityModuleOptions): DynamicModule {
    return {
      module: SecurityModule,
      imports: [
        JwtModule.register({
          secret: options.jwtOptions.secret,
          signOptions: options.jwtOptions.signOptions,
        }),
      ],
      providers: [JwtService, SecurityService, AuthGuard, RoleGuard],
      exports: [JwtModule, SecurityService],
    };
  }
}
