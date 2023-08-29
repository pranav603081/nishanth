"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.csv_model = void 0;
const mongoose_1 = require("mongoose");
// 2. Create a Schema corresponding to the document interface.
const csvSchema = new mongoose_1.Schema({
    address: { type: String, required: true },
    name: { type: String, required: true }
});
exports.csv_model = (0, mongoose_1.model)('csv', csvSchema);
//# sourceMappingURL=csv.js.map