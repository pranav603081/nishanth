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
            console.log("csv_details", csv_details);
            return h.response({ data: csv_details });
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