import { csv_model } from "../model/csv_model";


class CsvRepository {
    // private model = csv_model;

    public async getCsvRepoDetails(filter) {
        console.log("entered query repo"); 
        return await csv_model.find(filter);
    }

    public async saveCsvRepoDetails(csv_details){
        console.log("csv_details",csv_details);
        let bulkOperations = csv_details.map(csv_data => ({
            updateOne:{
                filter: {postcode: csv_data.postcode},
                update: { $set: csv_data },
                upsert: true
            }
        }))
        await csv_model.bulkWrite(bulkOperations);
    }
}

export const csv_object = new CsvRepository();