import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import apiRoutes from './routes/api.js'; // Algemene API-routes

// Initialiseer Express
const app = express();

// Laad omgevingsvariabelen
dotenv.config();

// Verwerk __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Poortinstelling
const PORT = process.env.PORT || 3000;

// CORS-instellingen
const corsOptions = {
  origin: 'http://localhost:8000', // Toestaan van de frontend-host
  methods: ['GET', 'POST'], // Toestaan van GET en POST
  allowedHeaders: ['Content-Type'], // Specifieke headers toestaan
};

// Middleware
app.use(cors(corsOptions)); // CORS instellen
app.use(express.json()); // JSON-parser

// Swagger-documentatie
let swaggerDocument;
try {
  const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
  const swaggerData = fs.readFileSync(swaggerPath, 'utf-8');
  swaggerDocument = JSON.parse(swaggerData);
  console.log('Swagger documentation loaded successfully.');
} catch (err) {
  console.error('Failed to load swagger.json:', err.message);
}

// Gebruik Swagger-documentatie indien beschikbaar
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
} else {
  console.warn('Swagger documentation not available.');
}

// Algemene API-routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
  console.log('Default route accessed.');
});

// Fallback voor niet-gevonden routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
