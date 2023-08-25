import {csvController} from '../controller';


export const csvRoutes = [
    {
        method: 'POST',
        path: '/csv_routes/v1/save_csv_details',
        handler: csvController.updateCsvDetails
        
    }
];