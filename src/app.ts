const hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
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

    server.start();
    console.log('Server running on 3045');
}

hapiRegisters();
