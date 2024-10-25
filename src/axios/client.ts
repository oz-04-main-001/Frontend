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