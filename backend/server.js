const express = require('express');
const cors = require('cors');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const userRouter = require('./routes/user');

const app = express();

app.use(cors());
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Node.js API with Swagger',
      version: '1.0.0',
      description: 'API documentation for your Node.js backend',
    },
    servers: [
      { url: 'http://localhost:5000' },
    ],
  },
  apis: ['./server.js', './routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

/**
 * @swagger
 * tags:
 *   name: General
 *   description: General endpoints
 */

/**
 * @swagger
 * /api/data:
 *   get:
 *     tags: [General]
 *     summary: Get a welcome message
 *     description: Returns a simple welcome message from the server
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Hello from Node.js!"
 */
app.get('/api/data', (req, res) => {
  res.json({ message: "Hello from Node.js!" });
});

app.use('/users', userRouter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI: http://localhost:${PORT}/api-docs`);
});