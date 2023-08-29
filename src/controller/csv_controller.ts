import { csvServices } from '../services';

export class CsvController {

    async updateCsvDetails(request, h) {
        console.log("updateCsvDetails controller");
        try {
            const data: any = request.payload;
            const uploadedStream: any = data.file; // 'file' corresponds to the field name in the form
            const csv_details = await csvServices.getCsvDetails(uploadedStream);
            csv_details.length = 3;
            await csvServices.saveCsvDetails(csv_details);
            return h.response({ message: "data updated successfully" });
        } catch (err) {
            console.log("err", err);
            throw err;
        }
    }

    async getCsvDetails(request,h){
        try{
        console.log("entered controller");
        let csv_data = await csvServices.getCsvRepoDetails();
        return h.response({data:csv_data});
        }catch(err){
            console.log("err", err);
            throw err;
        }
    }
}

export const csvController = new CsvController();
