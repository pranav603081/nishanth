export declare const csvRoutes: {
    method: string;
    path: string;
    options: {
        payload: {
            output: string;
            parse: boolean;
            allow: string;
        };
    };
    handler: (request: any, h: any) => Promise<void>;
}[];
