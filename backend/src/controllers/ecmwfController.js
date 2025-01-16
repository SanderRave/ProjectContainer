import axios from 'axios';
import config from '../config.js';

export const getECMWFData = async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const url = `${config.ecmwf.baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${config.ecmwf.apiKey}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching ECMWF data:', error.message);
    res.status(500).json({ error: 'Failed to fetch ECMWF data' });
  }
};
