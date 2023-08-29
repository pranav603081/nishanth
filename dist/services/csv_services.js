"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvServices = exports.CsvServices = void 0;
const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
const repositories_1 = require("../repositories");
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
    async getCsvDetails_v2(uploadedStream) {
        console.log("getCsvDetails services");
        const parsedRows = [];
        const csvStream = fastcsv.parse({ headers: true })
            .on('data', (row) => {
            // Process each row here
            parsedRows.push(row);
        })
            .on('end', () => {
            console.log('CSV parsing finished.');
        });
        uploadedStream.pipe(csvStream);
        await new Promise((resolve) => {
            uploadedStream.on('end', resolve);
        });
        return parsedRows;
    }
    async getCsvRepoDetails() {
        console.log("entered service");
        let csv_repo_details = await repositories_1.csv_object.getCsvRepoDetails();
        return csv_repo_details;
    }
    async saveCsvDetails(csv_details) {
        console.log("entered");
        repositories_1.csv_object.saveCsvRepoDetails(csv_details);
    }
}
exports.CsvServices = CsvServices;
exports.csvServices = new CsvServices();
//# sourceMappingURL=csv_services.js.map