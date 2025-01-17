import axios from 'axios';
import config from '../config.js';
import { getLastThreeHoursInterval } from '../utils/dateUtils.js'; // Of voeg de functie hier direct toe

export const getLastThreeHoursData = async (req, res) => {
  try {
    // Bereken het tijdsinterval
    const datetimeInterval = getLastThreeHoursInterval();

    const url = `${config.knmi.baseUrl}/observations/position`;
    const params = new URLSearchParams({
      coords: 'POINT(4.1217 51.9911)',
      'parameter-name': 'dd_10,ff_10m_10,fx_10m_10,p_nap_msl_10',
      f: 'CoverageJSON',
      datetime: datetimeInterval,
    });

    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${config.knmi.apiKey}`,
        Accept: 'application/json',
      },
      params, // Automatisch geparsed door axios
    });

    res.json(response.data); // Stuur de data terug naar de frontend
  } catch (error) {
    console.error(
      '[KNMI Controller] Error fetching data for the last three hours:',
      error.message
    );

    // Controleer of er een response van de API is
    if (error.response) {
      console.error(
        '[KNMI Controller] API Response:',
        error.response.data,
        'Status:',
        error.response.status
      );

      res.status(error.response.status).json({
        error: 'Failed to fetch data for the last three hours',
        details: error.response.data, // API-specifieke foutinformatie
      });
    } else if (error.request) {
      console.error('[KNMI Controller] No response received:', error.request);

      res.status(502).json({
        error: 'No response from KNMI API',
        message: 'Failed to communicate with KNMI API. Please try again later.',
      });
    } else {
      console.error('[KNMI Controller] Unknown Error:', error.message);

      res.status(500).json({
        error: 'Unexpected error',
        message: error.message,
      });
    }
  }
};
