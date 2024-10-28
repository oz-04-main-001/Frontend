import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
});

client.interceptors.request.use(
  config => {
    const userType = useAuthStore.getState().usertype; // Zustand에서 사용자 유형 가져오기
    const tokenKey = userType === 'guest' ? 'guest_token' : 'host_token'; // 사용자 유형에 따른 키 설정
    const token = localStorage.getItem(tokenKey); // 해당 키로 로컬 스토리지에서 토큰 가져오기

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
    const accessToken = response.data.accessToken;
    const userType = response.data.userType; // 응답에 userType이 포함되어 있다고 가정

    if (accessToken) {
      console.log('Access token received:', accessToken);
      const tokenKey = userType === 'guest' ? 'guest_token' : 'host_token';
      localStorage.setItem(tokenKey, accessToken); // 사용자 유형에 따라 다르게 저장

      const { setUsertype } = useAuthStore.getState();
      if (userType) {
        setUsertype(userType); // 'guest' 또는 'host'로 설정
      }
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
        const refreshResponse = await client.post('/api/v1/auth/token/refresh/');
        const newAccessToken = refreshResponse.data.accessToken;

        // 사용자 유형 재확인
        const userType = refreshResponse.data.userType;
        const tokenKey = userType === 'guest' ? 'guest_token' : 'host_token';
        localStorage.setItem(tokenKey, newAccessToken); // 새로운 토큰 저장

        // 원래 요청에 새로운 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 다시 시도
        return client(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired:', refreshError);
        // 로그인 페이지로 리다이렉트
        const navigate = useNavigate(); // 컴포넌트 내에서 호출
        navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default client;
