import express from 'express';
import mysql from 'mysql2/promise'; // Importeer MySQL-module
import apiRoutes from './routes/api.js'; // Importeer de routes

const app = express();
const PORT = process.env.PORT || 3000;

// Controleer of de database gebruikt moet worden via een environment variable
const useDatabase = process.env.USE_DATABASE === 'true';

// Dynamische databasefunctie
let pool;
const getDatabaseConnection = async () => {
  if (!useDatabase) {
    throw new Error('Database connection is disabled.');
  }

  if (!pool) {
    pool = mysql.createPool({
      host: 'db', // Servicenaam gedefinieerd in docker-compose.yml
      user: process.env.MYSQL_USER || 'wp_user',
      password: process.env.MYSQL_PASSWORD || 'wp_password',
      database: process.env.MYSQL_DATABASE || 'wp_database',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    console.log('Database pool initialized.');
  }

  return pool;
};

// Middleware om JSON-verzoeken te ondersteunen
app.use(express.json());

// Verbind de API-routes
app.use('/api', apiRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Optionele API-route voor databaseconnectie testen
app.get('/db-test', async (req, res) => {
  try {
    const pool = await getDatabaseConnection();
    const [rows] = await pool.query('SELECT NOW() AS currentTime');
    res.json({ message: 'Database connection successful!', data: rows });
  } catch (err) {
    res
      .status(500)
      .json({ error: 'Database query failed.', details: err.message });
  }
});

// API-route om dynamisch data te halen of een foutmelding te geven als de database is uitgeschakeld
app.get('/data', async (req, res) => {
  try {
    const pool = await getDatabaseConnection();
    const [rows] = await pool.query('SELECT * FROM some_table'); // Vervang 'some_table' door een bestaande tabelnaam
    res.json({ data: rows });
  } catch (err) {
    if (!useDatabase) {
      res
        .status(503)
        .json({ message: 'Database is disabled. No data is available.' });
    } else {
      res
        .status(500)
        .json({ message: 'Database query failed.', details: err.message });
    }
  }
});

// Start de server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
