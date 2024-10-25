import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
});

// 요청 인터셉터 설정
client.interceptors.request.use(
  function (config) {
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5Njk4MDIzLCJpYXQiOjE3Mjk2OTYyMjMsImp0aSI6ImE4NWMwYmNmYTZjMTRhMzA4Y2E0YjVhODFiODQyMDZlIiwidXNlcl9pZCI6MX0.gM3zxRlhDKF09VLAnU-uvo-da1eVzTiuoN5W07iH74s';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (서버 응답에서 토큰 저장)
client.interceptors.response.use(
  function (response) {
    const token = response.data.token; // 서버 응답에서 토큰 추출 (예시)
    if (token) {
      localStorage.setItem('auth_token', token); // 토큰을 로컬 스토리지에 저장
    }
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default client;
