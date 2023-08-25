"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvController = exports.CsvController = void 0;
class CsvController {
    async updateCsvDetails(request) {
        try {
            console.log("payload", request.payload);
            return "hello world";
        }
        catch (err) {
            console.log("err", err);
            return err;
        }
    }
}
exports.CsvController = CsvController;
exports.csvController = new CsvController();
//# sourceMappingURL=csv_controller.js.map