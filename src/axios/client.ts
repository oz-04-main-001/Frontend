import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
const client = axios.create({
  baseURL: serverURL,
});

// 토큰을 받아오는 데 Response body 쿠키로 이동시켜 저장해라

client.interceptors.request.use(function (config) {

  // 토큰 만료시 바꿔줘야함
  const token = "VITE_SERVER_TOKEN";

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default client;
