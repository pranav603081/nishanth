import { csvServices } from '../services'
export class CsvController {

    async updateCsvDetails(request, h) {
        console.log("updateCsvDetails controller");
        try {
            const data: any = request.payload;
            const uploadedStream: any = data.file; // 'file' corresponds to the field name in the form
            const csv_details = await csvServices.getCsvDetails(uploadedStream);
            console.log("csv_details",csv_details);
            return h.response({ data: csv_details });
        } catch (err) {
            console.log("err", err);
            throw err;
        }
    }
}

export const csvController = new CsvController();
