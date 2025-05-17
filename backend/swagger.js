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
const endpointsFiles = ['./app.js']; // Entry point of your Express app

swaggerAutogen(outputFile, endpointsFiles, doc);