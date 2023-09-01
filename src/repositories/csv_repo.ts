import { csv_model } from "../model/csv_model";


class CsvRepository {
    // private model = csv_model;

    public async getCsvRepoDetails(filter) {
        console.log("entered query repo");
        return await csv_model.find(filter);
    }

    public async saveCsvRepoDetails(csv_details) {
        console.log("csv_details", csv_details);

        for (const csvData of csv_details) {
            if (csvData.postcode) {
                csvData.postcode = csvData.postcode.replace(/\s/g, ''); // Remove spaces
            }
        }

        let bulkOperations = csv_details.map(csv_data => ({
            updateOne: {
                filter: { postcode: csv_data.postcode },
                update: { $set: csv_data },
                upsert: true
            }
        }))
        await csv_model.bulkWrite(bulkOperations);
    }
}

export const csv_object = new CsvRepository();