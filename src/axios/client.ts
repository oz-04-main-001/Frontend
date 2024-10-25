import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// 요청 인터셉터 설정
client.interceptors.request.use(
  function (config) {
    // Authorization 헤더에 토큰 추가
    // const token = localStorage.getItem('auth_token'); // 토큰을 로컬 스토리지에서 가져옴
    const token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5ODc1MDU1LCJpYXQiOjE3Mjk4Njc4NTUsImp0aSI6ImVmMjRjZWY0ZGJhZjRjMzU5NzU5NmQ3ZTE3MDYxMGFhIiwidXNlcl9pZCI6MTAyfQ.R4y6iv7WV4kbVSj1kvG6Ew30BrEN0FlXSVTUtKMJpJg';
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
=======
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import useAuthStore from '../stores/useAuthStore';
import { useNavigate } from 'react-router-dom';

const createAxiosInstance = () => {
  const serverURL = import.meta.env.VITE_SERVER_URL;

  const client = axios.create({
    baseURL: serverURL,
  });

  // 요청 및 응답 인터셉터 정의
  client.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      console.log('Retrieved token from localStorage:', token);
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  client.interceptors.response.use(
    (response: AxiosResponse) => {
      console.log('Response data:', response.data);
      const token: string = response.data.access_token; // 수정된 부분
      if (token) {
        console.log('Saving token:', token);
        localStorage.setItem('auth_token', token);
        console.log('Token saved in localStorage:', localStorage.getItem('auth_token'));
        
        document.cookie = `auth_token=${token}; path=/;`;
        console.log('Cookie set:', document.cookie);
        
        useAuthStore.setState({ email: response.data.email }); // 이메일 정보가 포함되어 있어야 합니다.
      }
      return response;
    },
    async (error: AxiosError) => {
      console.error('Error occurred:', error);
      const originalRequest = error.config as AxiosRequestConfig;
      const navigate = useNavigate();
      const authStore = useAuthStore();

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse: AxiosResponse = await client.post('/api/v1/auth/token/refresh/');
          const newAccessToken: string = refreshResponse.data.access_token; // 수정된 부분

          console.log('New access token received:', newAccessToken);
          localStorage.setItem('auth_token', newAccessToken);
          document.cookie = `auth_token=${newAccessToken}; path=/;`;
          
          client.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          useAuthStore.setState({ email: refreshResponse.data.email });
          return client(originalRequest);
        } catch (refreshError) {
          const axiosError = refreshError as AxiosError;

          if (axiosError.response?.status === 401) {
            console.log('Refresh token failed, navigating to login...');
            authStore.clearEmail();
            authStore.clearUsertype();
            authStore.clearBusinessProfile();
            navigate('/login');
          }
        }
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const client = createAxiosInstance();
export default client;