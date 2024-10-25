import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
  headers: {
    'Content-type': 'application/json',
  },
  withCredentials: true,
});

client.interceptors.request.use(function (config) {
  let token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default client;
