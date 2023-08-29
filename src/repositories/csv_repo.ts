import { csv_model } from "../model/csv_model";


class CsvRepository {
    // private model = csv_model;

    public async getCsvRepoDetails() {
        console.log("entered query repo"); 
        return await csv_model.find({});
    }

    public async saveCsvRepoDetails(csv_details){
        await csv_model.insertMany(csv_details);
    }
}

export const csv_object = new CsvRepository();