export declare const csvRoutes: ({
    method: string;
    path: string;
    options: {
        payload: {
            output: string;
            parse: boolean;
            allow: string;
            multipart: boolean;
            maxBytes: number;
        };
    };
    handler: (request: any, h: any) => Promise<any>;
} | {
    method: string;
    path: string;
    handler: (request: any, h: any) => Promise<any>;
    options?: undefined;
})[];
