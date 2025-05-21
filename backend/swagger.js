const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const doc = {
  info: {
    title: 'Node.js API with Swagger',
    version: '1.0.0',
    description: 'API documentation for your Node.js backend',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Development server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js', './routes/*.js']; // Add your files here

swaggerAutogen(outputFile, endpointsFiles, doc);
