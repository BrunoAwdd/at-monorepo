import { SetMetadata } from '@nestjs/common';
import { RoleMatch } from '../constants';

export const META_ROLES = 'roles';
export const META_ROLE_MATCHING_MODE = 'role-matching-mode';

export const Roles = (...roles: string[]): MethodDecorator & ClassDecorator =>
  SetMetadata(META_ROLES, roles);

export const RoleMatchingMode = (
  mode: RoleMatch,
): MethodDecorator & ClassDecorator =>
  SetMetadata(META_ROLE_MATCHING_MODE, mode);
