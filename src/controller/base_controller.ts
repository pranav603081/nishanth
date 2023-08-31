import Boom from '@hapi/boom';

// Define a custom Payload type that extends the original Payload type
interface CustomPayload extends Boom.Payload {
    status: string;
    message: string;
    errors: string[];
    code: number;
}

export abstract class BaseController {


    static handleSuccess(message, data, status, code) {
        console.log("handleSuccess", message, data);
        return {
            "status": status,
            "message": message,
            "data": data,
            "code": code,
        };
    }

    static handleError(failureStatus, failureCode, err) {
        console.log("handle error");
        const customError = Boom.boomify(new Error(err.message || "something went wrong"), { statusCode: failureCode });

        // Adding custom properties to the payload
        customError.output.payload = {
            status: failureStatus,
            message: customError.message,
            errors: ['Server error/request error'],
            code: customError.output.statusCode,
        } as CustomPayload;;


        return customError;
    }
}