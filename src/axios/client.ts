import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;
let token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMDM4NjA1LCJpYXQiOjE3MzAwMzE0MDUsImp0aSI6ImIzZjI1NDk3MzcwMjQ1NTBhNmVhZDRkM2YxNWU2MDMxIiwidXNlcl9pZCI6MzN9.T8y5OF_zAmkD90oRIZfaUJ242csNepLJdQHfKVTq3cM';
const client = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

client.interceptors.request.use(
  config => {
    //const token = localStorage.getItem('auth_token'); // 토큰을 로컬 스토리지에서 가져옴

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
