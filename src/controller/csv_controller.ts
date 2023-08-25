
export class CsvController {
    async updateCsvDetails (request){
        console.log("payload",request.payload);
        return "hello world";
    }
}

export const csvController = new CsvController();
