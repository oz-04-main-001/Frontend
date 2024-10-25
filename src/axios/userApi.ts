import login from './Login'; // axios 인스턴스 임포트
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 임포트

// 사용자 로그인 함수
export const getUserLogin = async (LoginData: { email: string, password: string }) => {
  try {
    const response = await login.post('/api/v1/auth/login/', LoginData);
    
    // 응답 데이터 확인
    console.log('응답 데이터:', response.data); // 응답 데이터 출력
    
    // Zustand 상태에 이메일 저장
    const email = response.data.email;  // 서버에서 이메일을 응답 데이터로 받는다고 가정
    useAuthStore.getState().setEmail(email); // 이메일을 전역 상태로 저장

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error; // 오류가 발생하면 다시 던짐
  }
};

// 사용자 등록 함수
export const getUserRegister = async () => {
  return await login.post('/api/v1/auth/register/request/')
    .then(response => response.data);
};