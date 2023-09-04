import { csv_model } from "../model/csv_model";


class CsvRepository {
    // private model = csv_model;

    public async getCsvRepoDetails(filter) {
        console.log("entered query repo");
        return await csv_model.find(filter);
    }

    public async saveCsvRepoDetails(csv_details) {
        console.log("csv_details saveCsvRepoDetails");

        csv_details.map(csvData => {
            if (csvData.POSTCODE) {
                csvData.postcode = csvData.POSTCODE.replace(/\s/g, ''); // Remove spaces
            }
            csvData.uprn = csvData.UPRN
            csvData.parent_uprn = csvData.PARENT_UPRN
            csvData.updrn = csvData.UPDRN
            csvData.long = csvData.LONG
            csvData.lat = csvData.LAT
            csvData.org_name = csvData.ORG_NAME
            csvData.po_box_number = csvData.PO_BOX_NUMBER
            csvData.sao_text = csvData.SAO_TEXT
            csvData.sao_start_number = csvData.SAO_START_NUMBER
            csvData.sao_start_suffix = csvData.SAO_START_SUFFIX
            csvData.sao_end_number = csvData.SAO_END_NUMBER
            csvData.sao_end_suffix = csvData.SAO_END_SUFFIX
            csvData.poa_text = csvData.PAO_TEXT
            csvData.pao_start_number = csvData.PAO_START_NUMBER
            csvData.poa_start_suffix = csvData.PAO_START_SUFFIX
            csvData.pao_end_number = csvData.PAO_END_NUMBER
            csvData.pao_end_suffix = csvData.PAO_END_SUFFIX
            csvData.street_description = csvData.STREET_DESCRIPTION
            csvData.street_locality = csvData.STREET_LOCALITY
            csvData.town_name = csvData.TOWN_NAME
            csvData.address = csvData.ADDRESS
            csvData.admin_area = csvData.ADMIN_AREA
        })

        console.log("csv_details needs to be inserted");
        await csv_model.insertMany(csv_details);
    }
}

export const csv_object = new CsvRepository();