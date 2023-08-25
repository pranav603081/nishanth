"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hapiRegisters = void 0;
const hapi = require('@hapi/hapi');
//const Inert = require('@hapi/inert');
//const csvParser = require('csv-parser');
const routes_1 = __importDefault(require("./routes"));
const hapiRegisters = async () => {
    const port = 3045;
    const server = hapi.server({
        port: port,
        host: 'localhost',
    });
    // Serve static files
    await server.register(require('@hapi/inert'));
    server.route({
        method: 'GET',
        path: '/server_routes/v1',
        handler: (request, h) => {
            console.log("hello world");
            return 'Hello World!';
        }
    });
    server.route({
        method: 'POST',
        path: '/csv_routes/v2/save_csv_details',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        },
        handler: async (request, h) => {
            console.log("enter controller", request);
            // const data:any = request.payload;
            // console.log("data",data);
            // const uploadedFile:any = data.file; // 'file' corresponds to the field name in the form
            // const csvData:any = [];
            // uploadedFile.pipe(csvParser())
            //     .on('data', (row:any) => {
            //         csvData.push(row);
            //     })
            //     .on('end', () => {
            //         return h.response(csvData);
            //     });
            return "hello";
        }
        //handler: csvController.updateCsvDetails
    });
    server.route(routes_1.default.csvRoutes);
    server.start();
    console.log('Server running on 3045');
};
exports.hapiRegisters = hapiRegisters;
(0, exports.hapiRegisters)();
//# sourceMappingURL=app.js.map