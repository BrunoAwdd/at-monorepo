"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Public = exports.META_PUBLIC = void 0;
const common_1 = require("@nestjs/common");
exports.META_PUBLIC = 'public';
const Public = () => (0, common_1.SetMetadata)(exports.META_PUBLIC, true);
exports.Public = Public;
