import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Laad expliciet de .env-variabelen uit de projectroot
  const env = loadEnv(mode, process.cwd(), 'VITE_');

  // Controleer of de variabelen correct worden geladen
  console.log(`VITE_BACKEND_PORT: ${env.VITE_BACKEND_PORT || 'Not loaded'}`);
  console.log(`VITE_BACKEND_HOST: ${env.VITE_BACKEND_HOST || 'Not loaded'}`);

  return {
    plugins: [react()],
    server: {
      host: 'localhost',
      port: Number(env.VITE_FRONTEND_PORT || 5173), // Gebruik standaard 5173 als fallback
      proxy: {
        '/api': {
          target: `${env.VITE_BACKEND_HOST}:${env.VITE_BACKEND_PORT}`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
