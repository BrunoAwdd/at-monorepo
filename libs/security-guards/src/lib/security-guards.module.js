"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var SecurityModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SecurityModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const auth_guard_1 = require("./guards/auth.guard");
const roles_guard_1 = require("./guards/roles.guard");
const security_service_1 = require("./security.service");
let SecurityModule = SecurityModule_1 = class SecurityModule {
    static forRoot(options) {
        return {
            module: SecurityModule_1,
            imports: [
                jwt_1.JwtModule.register({
                    secret: options.jwtOptions.secret, // Passa a chave secreta para o JwtModule
                    signOptions: options.jwtOptions.signOptions,
                }),
            ],
            providers: [jwt_1.JwtService, security_service_1.SecurityService, auth_guard_1.AuthGuard, roles_guard_1.RoleGuard],
            exports: [jwt_1.JwtModule, security_service_1.SecurityService],
        };
    }
};
exports.SecurityModule = SecurityModule;
exports.SecurityModule = SecurityModule = SecurityModule_1 = __decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({})
], SecurityModule);
