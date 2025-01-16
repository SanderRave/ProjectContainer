import express from 'express';
import { getECMWFData } from '../controllers/ecmwfController.js';
import { getKNMIData } from '../controllers/knmiController.js';
import { getRWSData } from '../controllers/rwsController.js';

const router = express.Router();

// RWS API - Algemeen
router.post('/rws/details', getRWSData);

// KNMI API
router.get('/knmi/:endpoint', getKNMIData);

// ECMWF API
router.get('/ecmwf/:endpoint', getECMWFData);

export default router;

router.post('/rws/details', (req, res, next) => {
  console.log('[API Router] POST /rws/details aangeroepen');
  next(); // Ga verder naar de controller
});
