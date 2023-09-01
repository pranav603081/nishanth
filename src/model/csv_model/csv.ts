import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ICsv {
    postcode: string;
    address: string;
    
}

// 2. Create a Schema corresponding to the document interface.
const csvSchema = new Schema<ICsv>({
    address: { type: String, required: true },
    postcode: { type: String, required: true }
},{timestamps: true});

export const csv_model = model('csv', csvSchema);




