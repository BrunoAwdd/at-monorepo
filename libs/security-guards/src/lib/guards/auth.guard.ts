import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { META_PUBLIC } from '../decorators/public.decorator';
import { SecurityService } from '../security.service';
import { IncomingHttpHeaders } from 'http';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,
    private readonly securityService: SecurityService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(META_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);

    const request = context.switchToHttp().getRequest();

    if (isPublic) {
      this.logger.debug('Public route accessed.');
      return true;
    }

    if (!request) {
      this.logger.warn('Request object is undefined.');
      return false;
    }

    const token = this.extractJwt(request.headers);
    const provider = this.extractProvider(request.headers);

    if (!token) {
      this.logger.warn('Token not found in protected route');
      throw new UnauthorizedException('Token not found');
    }

    return this.validateToken(token, request, provider);
  }

  /**
   * Validates a token based on the provider.
   * If it's an OAuth provider (e.g., Google), validate via `SecurityService`.
   * Otherwise, verify the JWT locally.
   */
  private async validateToken(
    token: string,
    request: any,
    provider: string
  ): Promise<boolean> {
    try {
      if (provider) {
        const providerValid = await this.securityService.validateToken(
          provider,
          token
        );
        if (providerValid) {
          this.logger.verbose(
            `OAuth token validated successfully via ${provider}`
          );
          request.user = providerValid;
          return true;
        }
      }

      // Validate JWT
      const decodedToken = this.jwtService.verify(token);
      request.user = decodedToken;

      this.securityService.setKeycloakId(decodedToken?.sub);

      this.logger.verbose('User authenticated successfully', {
        user: decodedToken,
      });

      return true;
    } catch (err) {
      if (err instanceof UnauthorizedException) {
        this.logger.warn('JWT validation failed', { error: err.message });
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractJwt(headers: { [key: string]: string }): string | null {
    const authHeader = headers['authorization'];
    if (!authHeader) {
      this.logger.verbose('Authorization header missing');
      return null;
    }

    const [bearer, token] = authHeader.split(' ');

    if (bearer?.toLowerCase() !== 'bearer' || !token) {
      this.logger.verbose('Invalid Bearer token format');
      return null;
    }

    return token;
  }

  private extractProvider(headers: IncomingHttpHeaders): string {
    const provider = headers['x-provider'];

    if (!provider) {
      this.logger.warn('Provider not found');
      return '';
    }

    return Array.isArray(provider) ? provider[0] : provider;
  }
}
