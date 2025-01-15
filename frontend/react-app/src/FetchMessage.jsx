import { useEffect, useState } from 'react';

function FetchMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const API_URL = `${import.meta.env.VITE_BACKEND_HOST}:${
      import.meta.env.VITE_BACKEND_PORT
    }`;
    console.log('Fetching from:', API_URL); // Debugging de API-URL
    fetch(`${API_URL}`)
      .then((response) => response.text())
      .then((data) => setMessage(data))
      .catch((error) => console.error('Fout bij ophalen van API:', error));
  }, []);

  return (
    <div>
      <p>{message || 'Laden...'}</p>
    </div>
  );
}

export default FetchMessage;
