import axios from 'axios';
import redisClient from '../redisClient.js'; // Redis setup
import config from '../config.js'; // Rijkswaterstaat API URL uit config

export const getRWSData = async (req, res) => {
  try {
    // Maak een unieke cache-sleutel gebaseerd op de body
    const cacheKey = 'rws:temperature:hoek';
    const cachedData = await redisClient.get(cacheKey);

    // Controleer of de data in de cache zit
    if (cachedData) {
      console.log('[RWS Controller] Serving data from cache');
      return res.json(JSON.parse(cachedData));
    }

    // Valideer de body van de request
    const { LocatieLijst, AquoPlusWaarnemingMetadataLijst } = req.body;

    if (!LocatieLijst || !AquoPlusWaarnemingMetadataLijst) {
      return res.status(400).json({ error: 'Invalid request body format' });
    }

    // Stel de API-aanroep in
    const url = `${config.rws.baseUrl}/ONLINEWAARNEMINGENSERVICES_DBO/OphalenLaatsteWaarnemingen`;
    console.log(`[RWS Controller] Sending request to Rijkswaterstaat: ${url}`);

    // Voer de externe API-aanroep uit
    const response = await axios.post(
      url,
      { LocatieLijst, AquoPlusWaarnemingMetadataLijst },
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    // Verwerk de respons
    const responseData = response.data;

    // Cache de data in Redis met een TTL van 5 minuten
    await redisClient.set(cacheKey, JSON.stringify(responseData), {
      EX: 300, // 300 seconden = 5 minuten
    });

    console.log('[RWS Controller] Serving data from API');
    res.json(responseData);
  } catch (error) {
    console.error('[RWS Controller] Error fetching data:', error.message);

    // Externe API-fout afhandelen
    if (error.response) {
      return res.status(error.response.status).json({
        error: error.response.data || 'External API error',
      });
    }

    // Log de RWS Base URL
    console.log('RWS Base URL:', config.rws.baseUrl);

    // Algemeen foutbericht
    res.status(500).json({ error: 'Failed to fetch data' });
  }
};
