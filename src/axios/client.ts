import axios from 'axios';

const serverURL = import.meta.env.VITE_SERVER_URL;

const login = axios.create({
  baseURL: serverURL,
 
});

// 요청 인터셉터 설정
login.interceptors.request.use(function (config) {
  // Authorization 헤더에 토큰 추가
  const token = localStorage.getItem('auth_token'); // 토큰을 로컬 스토리지에서 가져옴

  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
  }
  return config;
}, function (error) {
  return Promise.reject(error);
});

// 응답 인터셉터 (서버 응답에서 토큰 저장)
login.interceptors.response.use(function (response) {
  const token = response.data.token; // 서버 응답에서 토큰 추출 (예시)
  if (token) {
    localStorage.setItem('auth_token', token); // 토큰을 로컬 스토리지에 저장
  }
  return response;
}, function (error) {
  return Promise.reject(error);
});

export default login;
