/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
export declare class CsvServices {
    getCsvDetails(uploadedStream: any): Promise<any[]>;
    getCsvDetails_v2(uploadedStream: any): Promise<any[]>;
    getCsvDetails_v3(uploadedStream: any): Promise<any[]>;
    getCsvRepoDetails(): Promise<(import("mongoose").Document<unknown, {}, import("../model/csv_model").ICsv> & import("../model/csv_model").ICsv & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    saveCsvDetails(csv_details: any): Promise<void>;
}
export declare const csvServices: CsvServices;
