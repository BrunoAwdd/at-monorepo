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
var AuthGuard_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const public_decorator_1 = require("../decorators/public.decorator");
const security_service_1 = require("../security.service");
let AuthGuard = AuthGuard_1 = class AuthGuard {
    constructor(reflector, jwtService, securityService) {
        this.reflector = reflector;
        this.jwtService = jwtService;
        this.securityService = securityService;
        this.logger = new common_1.Logger(AuthGuard_1.name);
    }
    async canActivate(context) {
        const isPublic = this.reflector.getAllAndOverride(public_decorator_1.META_PUBLIC, [
            context.getClass(),
            context.getHandler(),
        ]);
        const request = context.switchToHttp().getRequest();
        if (!request)
            return true;
        if (isPublic)
            return true;
        const token = this.extractJwt(request.headers);
        if (!token) {
            this.logger.warn('Token não encontrado em rota protegida');
            throw new common_1.UnauthorizedException('Token não encontrado');
        }
        console.log(token);
        // Valida e decodifica o token JWT
        return this.validateJwt(token, request);
    }
    async validateJwt(token, request) {
        try {
            const decodedToken = this.jwtService.verify(token);
            request.user = decodedToken;
            // Armazena o keycloakId no SecurityService
            this.securityService.setKeycloakId(decodedToken.sub);
            this.logger.verbose('Usuário autenticado com sucesso');
            return true;
        }
        catch (err) {
            this.logger.warn('Falha ao validar o token JWT', { err });
            throw new common_1.UnauthorizedException('Token inválido');
        }
    }
    extractJwt(headers) {
        const authHeader = headers?.authorization;
        if (!authHeader) {
            this.logger.verbose('Cabeçalho de autorização ausente');
            return null;
        }
        const [bearer, token] = authHeader.split(' ');
        // Verifica se é um token Bearer válido
        if (bearer.toLowerCase() !== 'bearer' || !token) {
            this.logger.verbose('Cabeçalho de autorização não é Bearer ou token ausente');
            return null;
        }
        return token;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = AuthGuard_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector,
        jwt_1.JwtService,
        security_service_1.SecurityService])
], AuthGuard);
