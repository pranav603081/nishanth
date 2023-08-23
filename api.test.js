const Hapi = require('@hapi/hapi');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const jwt = require('jsonwebtoken');
const supertest = require('supertest');

// Import your server setup logic
const  init = require('./server.js'); // Update the path accordingly
//console.log("init",init);
//init();

describe('API Authentication Tests', () => {
    let server;

    beforeAll(async () => {
        server = await init(); // Initialize your Hapi server
        //console.log("server",server);
        //await server.register(HapiAuthJwt2);
        // Set up JWT authentication strategy
        // server.auth.strategy('jwt', 'jwt', {
        //     key: 'your-secret-key', // Replace with your secret key
        //     validate: async (decoded, request) => {
        //         // Mock validation logic for testing
        //         return { isValid: true };
        //     },
        //     verifyOptions: { algorithms: ['HS256'] },
        // });
        // server.auth.default('jwt');
    });

    afterAll(async () => {
        await server.stop();
    });

    it('should return 200 OK for authenticated request', async () => {
        // const token = jwt.sign({ sub: 'user123' }, 'your-secret-key', { expiresIn: '1h' });
        // console.log("token",token);

        const token = "hello"; 

        const response = await supertest(server.listener)
            .get('/sample_routes/v1/hello_world') // Replace with your route
            .set('Authorization', `Bearer ${token}`)
            .expect(200);

        // Add more assertions based on the expected response
    });

    it('should return 401 Unauthorized for unauthenticated request', async () => {
        const response = await supertest(server.listener)
            .get('/sample_routes/v1/hello_world') // Replace with your route
            .expect(401);

        // Add more assertions based on the expected response
    });
});