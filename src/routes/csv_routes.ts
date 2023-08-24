export const csvRoutes = [
    {
        method: 'POST',
        path: 'csv_routes/v1/save_csv_details',
        handler: (request, h) => {

            console.log("hello world");
            return 'Hello World!';
        }
        
    }
];