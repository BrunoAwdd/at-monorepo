"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable */
const axios_1 = __importDefault(require("axios"));
module.exports = async function () {
    // Configure axios for tests to use.
    const host = process.env.HOST ?? 'localhost';
    const port = process.env.PORT ?? '3000';
    axios_1.default.defaults.baseURL = `http://${host}:${port}`;
};
