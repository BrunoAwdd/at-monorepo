"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var RoleGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleGuard = exports.RoleMatch = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const public_decorator_1 = require("../decorators/public.decorator");
var RoleMatch;
(function (RoleMatch) {
    RoleMatch["ANY"] = "any";
    RoleMatch["ALL"] = "all";
})(RoleMatch || (exports.RoleMatch = RoleMatch = {}));
let RoleGuard = RoleGuard_1 = class RoleGuard {
    constructor(reflector, jwtService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger(RoleGuard_1.name);
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.META_PUBLIC, [
            context.getClass(),
            context.getHandler(),
        ]);
        // Ignorar rotas públicas
        if (isPublic) {
            return true;
        }
        // Extrair a requisição HTTP
        const request = context.switchToHttp().getRequest();
        const token = request.headers.authorization?.split(' ')[1];
        // Verificar se o token está presente
        if (!token) {
            this.logger.warn('Token não encontrado');
            throw new common_1.UnauthorizedException('Token não encontrado');
        }
        // Decodificar o token JWT
        const decodedToken = this.jwtService.decode(token);
        if (!decodedToken) {
            this.logger.warn('Token inválido');
            throw new common_1.UnauthorizedException('Token inválido');
        }
        // Obter as roles necessárias do decorador
        const requiredRoles = this.reflector.get('roles', context.getHandler()) || [];
        // Se não há roles necessárias, permitir acesso
        if (requiredRoles.length === 0) {
            return true;
        }
        // Obter o modo de correspondência de roles
        const roleMatchingMode = this.reflector.get('role-matching-mode', context.getHandler()) || RoleMatch.ANY;
        this.logger.verbose(`Roles necessárias: ${requiredRoles}`);
        this.logger.verbose(`Modo de correspondência de roles: ${roleMatchingMode}`);
        this.logger.verbose(`Roles do usuário: ${decodedToken.realm_access?.roles}`);
        // Verificar roles do usuário
        const userRoles = decodedToken.realm_access?.roles || [];
        const granted = this.matchRoles(requiredRoles, userRoles, roleMatchingMode);
        if (!granted) {
            this.logger.warn('Acesso negado - Roles insuficientes');
            throw new common_1.UnauthorizedException('Você não tem as permissões necessárias');
        }
        return true;
    }
    // Verificar se as roles do usuário correspondem às roles necessárias
    matchRoles(requiredRoles, userRoles, matchingMode) {
        if (matchingMode === RoleMatch.ANY) {
            return requiredRoles.some((role) => userRoles.includes(role));
        }
        else {
            return requiredRoles.every((role) => userRoles.includes(role));
        }
    }
};
exports.RoleGuard = RoleGuard;
exports.RoleGuard = RoleGuard = RoleGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService])
], RoleGuard);
