"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Route = void 0;
const common_1 = require("@nestjs/common");
// Define o decorador para verificar a rota
const Route = (route) => (0, common_1.SetMetadata)('route', route);
exports.Route = Route;
