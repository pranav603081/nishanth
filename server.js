console.log("server.js");
const Hapi = require('@hapi/hapi');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const routes = require("./app/routes/routes");

const init = async () => {
    const server = Hapi.server({
        port: 3000,
        host: 'localhost',
    });

    await server.register(HapiAuthJwt2);

    // Set up JWT authentication strategy
    server.auth.strategy('jwt', 'jwt', {
        key: 'your-secret-key', // Change this to a secure secret key
        validate: async (decoded, request) => {
            // Implement your JWT validation logic here
            // e.g., check user's existence, roles, etc.
            const isValid = true; // Implement your validation logic
            return { isValid };
        },
        verifyOptions: { algorithms: ['HS256'] },
    });

    server.auth.default('jwt'); // Set the default authentication strategy

    // ... define routes and start the server

    server.route(routes);

    await server.start();
    console.log('Server running on %s', server.info.uri);

    return server;

};

module.exports = init;

