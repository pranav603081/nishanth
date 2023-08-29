"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvRoutes = void 0;
const controller_1 = require("../controller");
exports.csvRoutes = [
    {
        method: 'POST',
        path: '/csv_routes/v1/save_csv_details',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true,
                maxBytes: 10000 * 1024 * 1024, // Max file size (1000MB)            
            },
        },
        handler: controller_1.csvController.updateCsvDetails
    },
    {
        method: 'GET',
        path: '/csv_routes/v1/get_csv_details',
        handler: controller_1.csvController.getCsvDetails
    }
];
//# sourceMappingURL=csv_routes.js.map