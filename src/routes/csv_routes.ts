//import { csvController } from '../controller';
const csvParser = require('csv-parser');

export const csvRoutes = [
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
            const data:any = request.payload;
            const uploadedFile:any = data.file; // 'file' corresponds to the field name in the form

            const csvData:any = [];

            uploadedFile.pipe(csvParser())
                .on('data', (row:any) => {
                    csvData.push(row);
                })
                .on('end', () => {
                    return h.response(csvData);
                });
        }
        //handler: csvController.updateCsvDetails

    }
];