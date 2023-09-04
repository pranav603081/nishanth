const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const mongoose = require('mongoose');

//const csvParser = require('csv-parser');
import csv_routes from './routes';

export const hapiRegisters = async () => {
    const port = 3045;
    const server = hapi.server({
        port: port,
        host: 'localhost',
    });

    // Serve static files
    await server.register([Inert]);

    server.route({
        method: 'GET',
        path: '/server_routes/v1',
        handler: (request, h) => {

            console.log("hello world");
            return 'Hello World!';
        }

    });

    server.route(csv_routes.csvRoutes);

    //    mongodb://localhost:27017/test
    let options: any = { useNewUrlParser: true, useUnifiedTopology: true }
    let mongoDBUrl: string = process.env.MONGO_DB_URL ? String(process.env.MONGO_DB_URL) : "mongodb://localhost:27017/btor";
    //console.log("mongoDBUrl",mongoDBUrl);

    await mongoose.connect(mongoDBUrl, options).
        then((connection: any) => {
            console.log("db connected successfully");
        });
    server.start();
    console.log('Server running on 3045');
}

hapiRegisters();
