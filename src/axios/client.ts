import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

client.interceptors.request.use(function (config) {
  const token =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Njk0NDYzLCJpYXQiOjE3Mjk2OTI2NjMsImp0aSI6ImY5YmI5MWViNjg0ODQ1YmNhNmNiMDlhMzVjMDM5NzMzIiwidXNlcl9pZCI6MX0.3BThWLfu86eMipdqChL50f-3hyGvBjWKD0gXJPdE9_s';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
