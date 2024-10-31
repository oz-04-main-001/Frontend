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
    const token = localStorage.getItem('auth_token');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// 타임아웃 구현 함수
const timeout = (ms: number): Promise<never> => 
  new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), ms));

// 응답 인터셉터 설정
client.interceptors.response.use(
  function (response) {
    const accessToken = response.data.accessToken;
    const userType = response.data.userType;

    if (accessToken) {
      console.log('Access token received:', accessToken);
      localStorage.setItem('auth_token', accessToken);

      const { setUsertype } = useAuthStore.getState();
      if (userType) {
        setUsertype(userType);
      }
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {

        // 리프레시 API 호출
        const refreshResponse = await client.post(
          '/api/v1/auth/token/refresh/'
        );
        const newAccessToken = refreshResponse.data.accessToken;
//         const refreshPromise = client.post<{ accessToken: string }>('/api/v1/auth/token/refresh/');
//         const refreshResponse = await Promise.race([refreshPromise, timeout(60000)]);


        console.log('Refresh Response:', refreshResponse);
        const newAccessToken = refreshResponse.data.accessToken;

        localStorage.setItem('auth_token', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return client(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token error or timeout:', refreshError);

        const navigate = useNavigate();
        navigate('/login');
      }
    }
    return Promise.reject(error);
  }
);

export default client;