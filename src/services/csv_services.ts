const csvParser = require('csv-parser');

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
        return  results;
    }
}

export const csvServices = new CsvServices();
