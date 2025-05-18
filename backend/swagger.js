const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API',
    description: 'Description',
  },
  host: 'localhost:5000',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // Entry point of your Express app

swaggerAutogen(outputFile, endpointsFiles, doc);