"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csvController = exports.CsvController = void 0;
class CsvController {
    async updateCsvDetails(request) {
        console.log("payload", request.payload);
        return "hello world";
    }
}
exports.CsvController = CsvController;
exports.csvController = new CsvController();
//# sourceMappingURL=csv_controller.js.map