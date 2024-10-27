import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../stores/useAuthStore';
const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(
  config => {
    const token = localStorage.getItem('auth_token'); // 토큰을 로컬 스토리지에서 가져옴
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      //로그인 로직 완료 시 삭제하기
      const { setUsertype } = useAuthStore.getState();
      setUsertype('guest');
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 설정
client.interceptors.response.use(
  function (response) {
    // 서버 응답에서 accessToken 추출하여 저장
    const accessToken = response.data.accessToken;
    if (accessToken) {
      console.log('Access token received:', accessToken); // 토큰 수신 확인 로그
      localStorage.setItem('auth_token', accessToken); // 로컬 스토리지에 저장
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // 401 에러 발생 시 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 재시도 방지

      try {
        // 리프레시 API 호출
        const refreshResponse = await client.post(
          '/api/v1/auth/token/refresh/'
        );
        const newAccessToken = refreshResponse.data.accessToken;

        // 새로운 토큰을 로컬 스토리지에 저장
        localStorage.setItem('auth_token', newAccessToken);

        // 원래 요청에 새로운 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 다시 시도
        return client(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰이 만료된 경우
        console.error('Refresh token expired:', refreshError);
        // 로그인 페이지로 리다이렉트
        useNavigate()('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default client;
