import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

// client.interceptors.request.use(function (config) {
//   const token = 1234;
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }

//   return config;
// });

export default client;
