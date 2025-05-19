const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Your API',
    version: '1.0.0',
    description: 'Automatically generated Swagger documentation'
  },
  host: 'localhost:5000',
  basePath: '/',
  schemes: ['http'],
  securityDefinitions: {
    bearerAuth: {
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Your main server file

swaggerAutogen(outputFile, endpointsFiles, doc);