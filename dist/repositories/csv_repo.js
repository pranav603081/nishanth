"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csv_object = void 0;
const csv_model_1 = require("../model/csv_model");
class CsvRepository {
    // private model = csv_model;
    async getCsvRepoDetails() {
        console.log("entered query repo");
        return await csv_model_1.csv_model.find({});
    }
    async saveCsvRepoDetails(csv_details) {
        let bulkOperations = csv_details.map(csv_data => ({
            updateOne: {
                filter: { name: csv_data.name },
                update: { $set: csv_data },
                upsert: true
            }
        }));
        await csv_model_1.csv_model.bulkWrite(bulkOperations);
    }
}
exports.csv_object = new CsvRepository();
//# sourceMappingURL=csv_repo.js.map