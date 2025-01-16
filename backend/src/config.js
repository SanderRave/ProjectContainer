import dotenv from 'dotenv';

dotenv.config();

export default {
  ecmwf: {
    baseUrl: process.env.ECMWF_API_BASE_URL,
    apiKey: process.env.ECMWF_API_KEY,
  },
  knmi: {
    baseUrl: process.env.KNMI_API_BASE_URL,
    apiKey: process.env.KNMI_API_KEY,
  },
  rws: {
    baseUrl: process.env.RWS_API_BASE_URL,
    apiKey: process.env.RWS_API_KEY,
  },
};
