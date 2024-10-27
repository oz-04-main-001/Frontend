import axios from 'axios';
const serverURL = import.meta.env.VITE_SERVER_URL;

const client = axios.create({
  baseURL: serverURL,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

// function getCsrfToken() {
//   const name = 'csrftoken=';
//   const decodedCookie = decodeURIComponent(document.cookie);
//   const cookies = decodedCookie.split(';');
//   for (let i = 0; i < cookies.length; i++) {
//     let c = cookies[i].trim();
//     if (c.indexOf(name) === 0) {
//       return c.substring(name.length, c.length);
//     }
//   }
//   return '';
// }

// 요청 인터셉터 설정
client.interceptors.request.use(
  function (config) {
    // Authorization 헤더에 토큰 추가
    //const token = localStorage.getItem('auth_token'); // 토큰을 로컬 스토리지에서 가져옴
    let token =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMwMDIzMzYyLCJpYXQiOjE3MzAwMTQxNzMsImp0aSI6IjlhZTY5M2FmNDM1ZjRhMDI5ZWY5ZDBiMzdlOGI5ODY0IiwidXNlcl9pZCI6MzN9.SpNNTyfbFnJXu3UvHBECwqPTW1teEsqZFMY9smIIjkk';
    // const csrfToken = getCsrfToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Authorization 헤더에 토큰 추가
    }
    // if (csrfToken) {
    //   config.headers['X-CSRFTOKEN'] = csrfToken;
    // }
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
