"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvServices = exports.CsvServices = void 0;
const csvParser = require('csv-parser');
class CsvServices {
    async getCsvDetails(uploadedStream) {
        console.log("getCsvDetails services");
        const results = await new Promise((resolve, reject) => {
            const parsedData = [];
            uploadedStream
                .pipe(csvParser())
                .on('data', (data) => {
                parsedData.push(data);
            })
                .on('end', () => {
                resolve(parsedData);
            })
                .on('error', (error) => {
                reject(error);
            });
        });
        return results;
    }
}
exports.CsvServices = CsvServices;
exports.csvServices = new CsvServices();
//# sourceMappingURL=csv_services.js.map