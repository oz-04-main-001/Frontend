import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

client.interceptors.request.use(function (config) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Njk4MDIzLCJpYXQiOjE3Mjk2OTYyMjMsImp0aSI6ImE4NWMwYmNmYTZjMTRhMzA4Y2E0YjVhODFiODQyMDZlIiwidXNlcl9pZCI6MX0.gM3zxRlhDKF09VLAnU-uvo-da1eVzTiuoN5W07iH74s';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
