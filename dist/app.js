"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hapiRegisters = void 0;
const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
//const csvParser = require('csv-parser');
const routes_1 = __importDefault(require("./routes"));
const hapiRegisters = async () => {
    const port = 3045;
    const server = hapi.server({
        port: port,
        host: 'localhost',
    });
    // Serve static files
    await server.register([Inert]);
    server.route({
        method: 'GET',
        path: '/server_routes/v1',
        handler: (request, h) => {
            console.log("hello world");
            return 'Hello World!';
        }
    });
    server.route(routes_1.default.csvRoutes);
    server.start();
    console.log('Server running on 3045');
};
exports.hapiRegisters = hapiRegisters;
(0, exports.hapiRegisters)();
//# sourceMappingURL=app.js.map