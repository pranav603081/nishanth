const csvParser = require('csv-parser');
const fastcsv = require('fast-csv');
import { csv_object } from '../repositories';

export class CsvServices {

    async getCsvDetails(uploadedStream) {
        console.log("getCsvDetails services");
        const results = await new Promise<any[]>((resolve, reject) => {
            const parsedData: any[] = [];

            uploadedStream
                .pipe(csvParser())
                .on('data', (data: any) => {
                    parsedData.push(data);
                })
                .on('end', () => {
                    resolve(parsedData);
                })
                .on('error', (error: any) => {
                    reject(error);
                });
        });
        return results;
    }

    async getCsvDetails_v2(uploadedStream) {
        console.log("getCsvDetails services");
        const parsedRows: any[] = [];
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
        let csv_repo_details = await csv_object.getCsvRepoDetails();
        return csv_repo_details;

    }

    async saveCsvDetails(csv_details) {
        console.log("entered");
        csv_object.saveCsvRepoDetails(csv_details);

    }
}

export const csvServices = new CsvServices();
