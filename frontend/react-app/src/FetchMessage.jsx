import { useEffect, useState } from 'react';

function FetchMessage() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000')
      .then((response) => response.text())
      .then((data) => setMessage(data));
  }, []);

  return <h1>{message}</h1>;
}

export default FetchMessage;
