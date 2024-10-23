import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

client.interceptors.request.use(function (config) {
  // 토큰 만료시 바꿔줘야함
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Njk2NTEyLCJpYXQiOjE3Mjk2OTQ3MTIsImp0aSI6IjY3NTNhNWMxMGIzZjQwNTY5ZDQ1YjIzODgyYTk4NjkyIiwidXNlcl9pZCI6MX0.EKUuJHG9SxgOYDSUi8WctEShVu3kklWF9kL_P2XmpTE";
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
