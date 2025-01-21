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

export enum RoleMatch {
  ANY = 'any',
  ALL = 'all',
}

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);

  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(META_PUBLIC, [
      context.getClass(),
      context.getHandler(),
    ]);

    // Allow public routes
    if (isPublic) {
      return true;
    }

    // Extract HTTP request
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split(' ')[1];

    // Ensure the token exists
    if (!token) {
      this.logger.warn('Token not found');
      throw new UnauthorizedException('Token not found');
    }

    // Decode JWT token
    const decodedToken = this.jwtService.decode(token) as {
      realm_access?: { roles?: string[] };
    } | null;
    if (!decodedToken) {
      this.logger.warn('Invalid token');
      throw new UnauthorizedException('Invalid token');
    }

    // Retrieve required roles from decorator
    const requiredRoles =
      this.reflector.get<string[]>('roles', context.getHandler()) || [];

    // If no roles are required, allow access
    if (requiredRoles.length === 0) {
      return true;
    }

    // Retrieve role matching mode
    const roleMatchingMode =
      this.reflector.get<RoleMatch>(
        'role-matching-mode',
        context.getHandler()
      ) || RoleMatch.ANY;

    this.logger.verbose(`Required roles: ${requiredRoles}`);
    this.logger.verbose(`Role matching mode: ${roleMatchingMode}`);
    this.logger.verbose(`User roles: ${decodedToken.realm_access?.roles}`);

    // Validate user's roles
    const userRoles = decodedToken.realm_access?.roles || [];
    const isGranted = this.matchRoles(
      requiredRoles,
      userRoles,
      roleMatchingMode
    );

    if (!isGranted) {
      this.logger.warn('Access denied - Insufficient roles');
      throw new UnauthorizedException(
        'You do not have the necessary permissions'
      );
    }

    return true;
  }

  /**
   * Check if user's roles match the required roles.
   */
  private matchRoles(
    requiredRoles: string[],
    userRoles: string[],
    matchingMode: RoleMatch
  ): boolean {
    return matchingMode === RoleMatch.ANY
      ? requiredRoles.some((role) => userRoles.includes(role))
      : requiredRoles.every((role) => userRoles.includes(role));
  }
}
