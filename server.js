// server.js
require('dotenv').config();
const express = require('express');
const { initDb } = require('./db/connect');
const contactsRouter = require('./routes/contacts');
const templeRouter = require('./routes/temples');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Home route
app.get('/', (req, res) => {
  res.send('Contacts API - Week 1');
});

// API Routes
app.use('/api/contact', contactsRouter);
app.use('api/temples', templeRouter);
app.use('api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Start server after DB init
initDb((err) => {
  if (err) {
    console.log('MongoDB connection failed:', err.message);
  } else {
    console.log('MongoDB connected!');
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
