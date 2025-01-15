import express from 'express';
import axios from 'axios'; // Voor WordPress API-verzoeken
import dotenv from 'dotenv'; // Voor omgevingsvariabelen
import swaggerUi from 'swagger-ui-express'; // Voor Swagger UI
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Los __dirname op voor ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Probeer swagger.json te laden met foutafhandeling
let swaggerDocument;
try {
  const swaggerPath = path.join(__dirname, 'docs', 'swagger.json');
  const swaggerData = fs.readFileSync(swaggerPath, 'utf-8');
  swaggerDocument = JSON.parse(swaggerData);
  console.log('Swagger documentation loaded successfully.');
} catch (err) {
  console.error('Failed to load swagger.json:', err.message);
  swaggerDocument = null; // Gebruik een fallback of sla deze stap over
}

// Laad omgevingsvariabelen
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || '';
const USE_WORDPRESS = process.env.USE_WORDPRESS === 'true';

// Middleware
app.use(express.json()); // Ondersteuning voor JSON-verzoeken

// Controleer omgevingsvariabelen bij opstarten
if (!WORDPRESS_API_URL && USE_WORDPRESS) {
  console.warn(
    'USE_WORDPRESS is enabled, but WORDPRESS_API_URL is not defined. Certain routes may not function correctly.'
  );
}

// WordPress API-routes (alleen activeren als USE_WORDPRESS waar is)
if (USE_WORDPRESS) {
  app.get('/api/posts', async (req, res) => {
    try {
      if (!WORDPRESS_API_URL) {
        throw new Error('WORDPRESS_API_URL is not defined.');
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

  console.log('WordPress API routes are enabled.');
} else {
  console.log('WordPress API routes are disabled.');
}

// Swagger UI
if (swaggerDocument) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
} else {
  console.warn('Swagger documentation not available. Check swagger.json.');
}

// Verbind de algemene API-routes
import apiRoutes from './routes/api.js';
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
  console.log('Default route accessed.');
});

// Voorbeeld API zonder database
app.get('/api/example', (req, res) => {
  res.json({ message: 'API werkt zonder database!' });
});

// Fallback route (voor niet-gevonden paden)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
