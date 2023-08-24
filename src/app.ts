const hapi = require('@hapi/hapi');
import csv_routes from './routes';

export const hapiRegisters = async () => {
const port = 3045;
const server = hapi.server({
    port: port,
    host: 'localhost'
});

server.route({
    method: 'GET',
        path: '/server_routes/v1',
            handler: (request, h) => {

                console.log("hello world");
                return 'Hello World!';
            }

});

server.route(csv_routes);

server.start();
console.log('Server running on 3045');
}

hapiRegisters();
