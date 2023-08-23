module.exports = [


    {
        method: 'GET',
        path: '/sample_routes/v1/hello_world',
        handler: (request, h) => {

            console.log("hello world");
            return 'Hello World!';
        }
    }
]
