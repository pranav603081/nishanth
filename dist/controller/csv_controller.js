"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvController = exports.CsvController = void 0;
const services_1 = require("../services");
class CsvController {
    async updateCsvDetails(request, h) {
        console.log("updateCsvDetails controller");
        try {
            const data = request.payload;
            const uploadedStream = data.file; // 'file' corresponds to the field name in the form
            const csv_details = await services_1.csvServices.getCsvDetails(uploadedStream);
            csv_details.length = 3;
            await services_1.csvServices.saveCsvDetails(csv_details);
            return h.response({ message: "data updated successfully" });
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