"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvController = exports.CsvController = void 0;
const services_1 = require("../services");
class CsvController {
    async updateCsvDetails(request, h) {
        console.log("updateCsvDetails controller");
        try {
            // const data: any = request.payload;
            // const uploadedStream: any = data.file; // 'file' corresponds to the field name in the form
            // const csv_details = await csvServices.getCsvDetails_v2(uploadedStream);
            // csv_details.length = 3;
            let csv_details = [{ name: "sharu", address: "pune" }, { name: "nishanth", address: "banglore" }];
            await services_1.csvServices.saveCsvDetails(csv_details);
            return h.response({ message: "data updated successfully", data: csv_details });
        }
        catch (err) {
            console.log("err", err);
            throw err;
        }
    }
    async getCsvDetails(request, h) {
        try {
            console.log("entered controller");
            let csv_data = await services_1.csvServices.getCsvRepoDetails();
            return h.response({ data: csv_data });
        }
        catch (err) {
            console.log("err", err);
            throw err;
        }
    }
}
exports.CsvController = CsvController;
exports.csvController = new CsvController();
//# sourceMappingURL=csv_controller.js.map