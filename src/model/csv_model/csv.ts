import { Schema, model } from 'mongoose';

// 1. Create an interface representing a document in MongoDB.
export interface ICsv {
    address: string;
    name: string;
    index?: Number;
}

// 2. Create a Schema corresponding to the document interface.
const csvSchema = new Schema<ICsv>({
    address: { type: String, required: true },
    name: { type: String, required: true }
});

export const csv_model = model('csv', csvSchema);




