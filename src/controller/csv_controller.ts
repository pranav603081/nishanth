import { csvServices } from '../services';
//const { extname } = require('path')
export class CsvController {

    async updateCsvDetails(request, h) {
        console.log("updateCsvDetails controller");
        try {
            const data: any = request.payload;
            let file_name = data.file.hapi.filename;
            const file_extension = file_name.substr(file_name.lastIndexOf('.')).toLowerCase();
            if (file_extension != ".csv")
                return h.response({ message: "please upload csv file" }).code(400);

            const uploadedStream: any = data.file; // 'file' corresponds to the field name in the form
            const csv_details = await csvServices.getCsvDetails_v2(uploadedStream);
            //csv_details.length = 3;
            //let csv_details = [{ name: "sharu", address: "pune" }, { name: "nishanth", address: "banglore" }];
            await csvServices.saveCsvDetails(csv_details);
            return h.response({ message: "data updated successfully", data: csv_details }).code(200);
        } catch (err) {
            console.log("err", err);
            return h.response({ message: "something went wrong" }).code(500);
        }
    }

    async getCsvDetails(request, h) {
        try {
            console.log("entered controller");
            let csv_data = await csvServices.getCsvRepoDetails();
            return h.response({ data: csv_data });
        } catch (err) {
            console.log("err", err);
            throw err;
        }
    }
}

export const csvController = new CsvController();
