import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Hiermee luistert Vite op alle netwerken
    port: 5173, // Zorg ervoor dat dit overeenkomt met je poortmapping
    strictPort: true, // Forceert gebruik van de opgegeven poort en voorkomt fallback
    watch: {
      usePolling: true, // Handig voor bestanden die live wijzigen binnen Docker
    },
  },
});
