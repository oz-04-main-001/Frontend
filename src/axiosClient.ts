import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
const VITE_CLIENT_URL = import.meta.env.VITE_CLIENT_URL;
const VITE_SERVER_URL = import.meta.env.VITE_SERVER_URL;
interface APIResponse<T> {
  statusCode: number; // 상태코드 (보인 서버상태코드)
  errorCode: number; // 에러코드 (본인 서버에러코드)
  message: string; // 메시지
  result: T; // 데이터 내용
}
const client: AxiosInstance = axios.create({
  baseURL: VITE_SERVER_URL,
  timeout: 5000,
});
const setRequestDefaultHeader = (requestConfig: AxiosRequestConfig) => {
  const config = requestConfig;
  config.headers = {
    ...config.headers,
    'Content-Type': 'application/json;charset=utf-8',
  };
  return config;
};
export const getData = async <T>(
  url: string,
  setRequestDefaultHeader?: AxiosRequestConfig
) => {
  try {
    const response = await client.get<APIResponse<T>>(
      url,
      setRequestDefaultHeader
    );
    if (response && response.data) {
      const data = response.data;
      return data;
    } else {
      console.error('No data returned in the response');
      return undefined;
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;
      console.log(
        'Axios error:',
        axiosError.response?.data || axiosError.message
      );
      return axiosError.response?.data || axiosError.message;
    } else if (error instanceof Error) {
      console.error('General error:', error.message);
      return error.message;
    } else {
      console.error('Unexpected error', error);
      return undefined;
    }
  }
};
