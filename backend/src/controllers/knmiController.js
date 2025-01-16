import axios from 'axios';
import config from '../config.js';

export const getKNMIData = async (req, res) => {
  try {
    const endpoint = req.params.endpoint;
    const url = `${config.knmi.baseUrl}/${endpoint}`;
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${config.knmi.apiKey}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching KNMI data:', error.message);
    res.status(500).json({ error: 'Failed to fetch KNMI data' });
  }
};
