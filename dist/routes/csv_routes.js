"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvRoutes = void 0;
const controller_1 = require("../controller");
exports.csvRoutes = [
    {
        method: 'POST',
        path: '/csv_routes/v1/save_csv_details',
        handler: controller_1.csvController.updateCsvDetails
    }
];
//# sourceMappingURL=csv_routes.js.map