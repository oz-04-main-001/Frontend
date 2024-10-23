import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

client.interceptors.request.use(function (config) {
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NjYyMDc3LCJpYXQiOjE3Mjk2NjAyNzcsImp0aSI6ImEzMTZlODU0MjUyNjQ1OTQ4OTBhYjdmMTc4ZDA1NjMwIiwidXNlcl9pZCI6MX0.-vCzEFObt3CirlhmeDgWFSkejLb0h3-Lw83Y7PhPf94";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
