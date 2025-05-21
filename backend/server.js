const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const db = require('./models');
const routes = require('./routes');
const swaggerSpec = require('./swagger');

const app = express();

const corsOptions = {
  origin: '*', // change to your frontend URL in production
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

app.use((req, res, next) => {
  console.log('Request headers:', req.headers);
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use('/api', routes);

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sample endpoint (optional)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

// Database connection
db.sequelize.sync()
  .then(() => {
    console.log('Database connected');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Swagger UI available at http://localhost:${PORT}/api-docs`);
});
