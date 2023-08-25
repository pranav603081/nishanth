"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvRoutes = void 0;
//import { csvController } from '../controller';
const csvParser = require('csv-parser');
exports.csvRoutes = [
    {
        method: 'POST',
        path: '/csv_routes/v1/save_csv_details',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data'
            }
        },
        handler: async (request, h) => {
            const data = request.payload;
            const uploadedFile = data.file; // 'file' corresponds to the field name in the form
            const csvData = [];
            uploadedFile.pipe(csvParser())
                .on('data', (row) => {
                csvData.push(row);
            })
                .on('end', () => {
                return h.response(csvData);
            });
        }
        //handler: csvController.updateCsvDetails
    }
];
//# sourceMappingURL=csv_routes.js.map