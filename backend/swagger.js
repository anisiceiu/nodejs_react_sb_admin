const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Your App Name API',
    version: '1.0.0',
    description: 'API documentation for your Node.js app with JWT auth',
  },
  servers: [
    {
      url: 'http://localhost:5000',
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
    schemas: {
      Employee: {
        type: 'object',
        required: ['Name', 'Email', 'Position', 'Salary', 'HireDate', 'DepartmentId'],
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          Name: {
            type: 'string',
            maxLength: 100,
            example: 'John Doe',
          },
          Email: {
            type: 'string',
            format: 'email',
            example: 'john.doe@example.com',
          },
          Position: {
            type: 'string',
            maxLength: 50,
            example: 'Software Engineer',
          },
          Salary: {
            type: 'number',
            format: 'decimal',
            example: 75000.00,
          },
          HireDate: {
            type: 'string',
            format: 'date',
            example: '2023-06-01',
          },
          DepartmentId: {
            type: 'integer',
            example: 2,
          },
        },
      },
      Department: {
        type: 'object',
        required: ['Name'],
        properties: {
          id: {
            type: 'integer',
            example: 1,
          },
          Name: {
            type: 'string',
            maxLength: 100,
            example: 'Human Resources',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./server.js', './routes/*.js'], // Fixed typo: '.server.js' → './server.js'
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
