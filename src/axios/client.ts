import axios from 'axios';
import useAuthStore from '../stores/useAuthStore';

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
        console.log('User type received:', userType);
        setUsertype(userType);
      }
    }
    return response;
  },
  async function (error) {
    const originalRequest = error.config;

    // 401 에러 발생 시 처리
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 로컬 스토리지에서 만료된 액세스 토큰을 그대로 가져옴
        const expiredAccessToken = localStorage.getItem('auth_token');
        console.log(expiredAccessToken)

        // 리프레시 API 호출 (만료된 액세스 토큰을 Authorization 헤더에 포함)
        const refreshResponse = await client.post(
          '/api/v1/auth/token/refresh/',
          {},
          {
            headers: {
              Authorization: `Bearer ${expiredAccessToken}`, 
            },
          }
        );
        const newAccessToken = refreshResponse.data.access_token;
        console.log(refreshResponse.data)
       
        // 새로운 액세스 토큰을 auth_token 키로 저장
        localStorage.setItem('auth_token', newAccessToken);

        // 리프레시로 받은 토큰을 refresh_auth_token으로 저장
        const refreshAuthToken = refreshResponse.data.refreshToken;
        if (refreshAuthToken) {
          localStorage.setItem('refresh_auth_token', refreshAuthToken);
        }

        console.log('재발급 성공');

        // 원래 요청에 새로운 토큰 추가
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청 다시 시도
        return client(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token expired:', refreshError);

        // 모든 인증 데이터 삭제
        localStorage.removeItem('auth_token'); 
        localStorage.removeItem('refresh_auth_token'); 

        // Zustand 스토어 초기화 (사용자 세션 상태 초기화)
        const { clearAuth } = useAuthStore.getState();
        clearAuth();

        // 로그인 페이지로 리디렉트
        window.location.href = '/user/login';
      }
    }
    return Promise.reject(error);
  }
);

export default client;
