
export class CsvController {
    async updateCsvDetails (request){

        try{
        console.log("payload",request.payload);
        return "hello world";
        }catch(err){
            console.log("err",err);
            return err;
        }
    }
}

export const csvController = new CsvController();
