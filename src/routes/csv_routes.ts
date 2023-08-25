import { csvController } from '../controller';

export const csvRoutes = [
    {
        method: 'POST',
        path: '/csv_routes/v1/save_csv_details',
        options: {
            payload: {
                output: 'stream',
                parse: true,
                allow: 'multipart/form-data',
                multipart: true,
                // maxBytes: 10 * 1024 * 1024, // Max file size (10MB)            
            },
        },
        handler: csvController.updateCsvDetails

    }
];