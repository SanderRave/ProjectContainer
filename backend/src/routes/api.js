import express from 'express';
import { getExample } from '../controllers/exampleController.js'; // Importeer de controller

const router = express.Router();

// Definieer de route
router.get('/example', getExample);

export default router; // Exporteer de router voor gebruik in app.js
