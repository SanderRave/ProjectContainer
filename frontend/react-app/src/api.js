const API_BASE_URL = `${import.meta.env.VITE_BACKEND_HOST}:${
  import.meta.env.VITE_BACKEND_PORT
}`;

export const fetchExampleData = async () => {
  const response = await fetch(`${API_BASE_URL}/api/example`);
  return await response.json();
};
