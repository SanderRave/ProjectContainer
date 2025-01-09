import express from 'express';
import axios from 'axios'; // Importeer Axios voor WordPress API-verzoeken
import dotenv from 'dotenv'; // Importeer dotenv-module
import swaggerUi from 'swagger-ui-express'; // Importeer Swagger UI
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolving the correct __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Probeer swagger.json in te lezen met foutafhandeling
let swaggerDocument;
try {
  const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
  const swaggerData = fs.readFileSync(swaggerPath, 'utf-8');
  swaggerDocument = JSON.parse(swaggerData);
  console.log('Swagger documentation loaded successfully.');
} catch (err) {
  console.error('Failed to load swagger.json:', err.message);
  swaggerDocument = null; // Optioneel: Gebruik een leeg document of sla deze stap over
}

import apiRoutes from './routes/api.js'; // Importeer de routes

dotenv.config(); // Laad de omgevingsvariabelen uit het .env-bestand

const app = express();
const PORT = process.env.PORT || 3000;
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL; // WordPress URL uit .env

// Middleware om JSON-verzoeken te ondersteunen
app.use(express.json());

// Verbind Swagger UI met je API-documentatie (indien beschikbaar)
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
} else {
  console.warn('Swagger documentation not available. Check swagger.json.');
}

// Verbind de API-routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
  console.log('Backend default route accessed.');
});

// API-route om gegevens van WordPress op te halen
app.get('/api/posts', async (req, res) => {
  try {
    if (!WORDPRESS_API_URL) {
      throw new Error(
        'WORDPRESS_API_URL is not defined in the environment variables.'
      );
    }
    const response = await axios.get(`${WORDPRESS_API_URL}/wp/v2/posts`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from WordPress:', error.message);
    res.status(500).json({
      error: 'Failed to fetch data from WordPress',
      details: error.message,
    });
  }
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (swaggerDocument) {
    console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
  }
});
