import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ICsv {
    postcode: string;
    address: string;
    uprn: string;
    parent_uprn: string;
    updrn: string;
    long: string;
    lat: string;
    org_name: string;
    po_box_number: string;
    sao_text: string;
    sao_start_number: string;
    sao_start_suffix: string;
    sao_end_number: string;
    sao_end_suffix: string;
    poa_text: string;
    pao_start_number: string;
    poa_start_suffix: string;
    pao_end_number: string;
    pao_end_suffix: string;
    street_description: string;
    street_locality: string;
    town_name: string;
    admin_area: string;
}

// 2. Create a Schema corresponding to the document interface.
const csvSchema = new Schema<ICsv>({
    address: { type: String },
    postcode: { type: String, required: true },
    uprn: { type: String},
    parent_uprn: { type: String},
    updrn: { type: String},
    long: { type: String},
    lat: { type: String},
    org_name: { type: String},
    po_box_number: { type: String},
    sao_text: { type: String},
    sao_start_number: { type: String},
    sao_start_suffix: { type: String},
    sao_end_number: { type: String},
    sao_end_suffix: { type: String},
    poa_text: { type: String},
    pao_start_number: { type: String},
    poa_start_suffix: { type: String},
    pao_end_number: { type: String},
    pao_end_suffix: { type: String},
    street_description: { type: String},
    street_locality: { type: String},
    town_name: { type: String},
    admin_area: { type: String},

}, { timestamps: true });

export const csv_model = model('csv', csvSchema);




