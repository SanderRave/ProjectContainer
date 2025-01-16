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
