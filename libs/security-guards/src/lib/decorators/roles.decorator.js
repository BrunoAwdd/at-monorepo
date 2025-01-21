"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMatchingMode = exports.Roles = exports.META_ROLE_MATCHING_MODE = exports.META_ROLES = void 0;
const common_1 = require("@nestjs/common");
exports.META_ROLES = 'roles';
exports.META_ROLE_MATCHING_MODE = 'role-matching-mode';
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.META_ROLES, roles);
exports.Roles = Roles;
const RoleMatchingMode = (mode) => (0, common_1.SetMetadata)(exports.META_ROLE_MATCHING_MODE, mode);
exports.RoleMatchingMode = RoleMatchingMode;
