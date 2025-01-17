### **Changelog**

- Verbijzondering op /ProjectContainer

#### **Recente Aanpassingen**

##### **1. WordPress API**

- Een nieuwe route toegevoegd om WordPress-berichten op te halen:
  - Route: `/api/posts`
  - WordPress-functionaliteit kan worden in- of uitgeschakeld via de variabele `USE_WORDPRESS` in `.env`.
    - **Voorbeeld:**
      ```env
      USE_WORDPRESS=true
      WORDPRESS_API_URL=https://example.com/wp-json
      ```
    - Als `USE_WORDPRESS` is uitgeschakeld, worden de WordPress-routes niet geladen.

##### **2. Nieuwe Voorbeeldroute**

- Een voorbeeldroute toegevoegd voor eenvoudige API-tests:
  - Route: `/api/example`
  - Deze retourneert een simpele JSON-response zonder afhankelijkheid van externe systemen:
    ```json
    {
      "message": "API werkt zonder database!"
    }
    ```

##### **3. Verbeterde Foutafhandeling**

- Toegevoegd: Een fallback-route voor niet-gevonden paden (`404`):
  - **Response:**
    ```json
    {
      "error": "Route not found"
    }
    ```

##### **4. Verbeterde Logging**

- Duidelijke console-logberichten toegevoegd voor:
  - Activering van de WordPress API.
  - Waarschuwingen bij ontbrekende omgevingsvariabelen.
  - Beschikbaarheid van Swagger-documentatie.

##### **5. `.env`-Structuur Gescheiden**

- **Frontend `.env`:** Bevat alleen configuratievariabelen nodig voor de frontend:
  ```env
  VITE_BACKEND_HOST=http://localhost
  VITE_BACKEND_PORT=3000
  VITE_USE_DATABASE=false
  VITE_WORDPRESS_API_URL=https://example.com/wp-json
  ```

## Rijkswaterstaat API Integratie

Deze applicatie haalt actuele lucht- en watertemperatuur op van de Rijkswaterstaat API, met caching via Redis en een frontend-interface voor dataweergave.

### Backend

- **Functie:** Roept de Rijkswaterstaat API aan met POST-verzoeken en slaat de response tijdelijk op in Redis.
- **Hoofdbestand:** `rwsController.js`
- **Routes:**

  - POST `/api/rws/details`
    - Verwacht een JSON body met een lijst van locaties en parameters.
    - Haalt gegevens op van Rijkswaterstaat en cachet de response 5 minuten.

- **Configuratie:**
  Zorg ervoor dat de volgende waarden in `.env` zijn ingesteld:
  ```env
  RWS_API_BASE_URL=https://waterwebservices.rijkswaterstaat.nl
  PORT=3000
  ```

## Features Added

### 1. KNMI API Integration

- Fetches the last three hours of weather data for Hoek van Holland.
- Parameters include:
  - Wind direction (dd_10)
  - Wind speed (ff_10m_10)
  - Maximum wind gust (fx_10m_10)
  - Air pressure (p_nap_msl_10)
  - Visibility (mor_10)
  - Current weather (ww_curr_10)
- Supports time interval utility for UTC-based requests.

### 2. Rijkswaterstaat API Integration

- Retrieves water and air temperature from specified locations (e.g., Hoek van Holland).
- Handles specific metadata requests using JSON payloads.

### 3. Testing Interface

- `test.html` allows manual testing of both APIs.
- Features:
  - Separate buttons for KNMI and Rijkswaterstaat data fetch.
  - Displays API responses in a formatted JSON view.

## Folder Structure Changes

- **controllers**: Added `knmiController.js` and `rwsController.js`.
- **utils**: Added `dateUtils.js` for time interval utilities.
- **routes**: Updated `api.js` to define KNMI and RWS endpoints.

## How to Test

1. Run the backend server:
   ```bash
   npm run dev
   ```

---
