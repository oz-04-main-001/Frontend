import login from './client'; // axios 인스턴스 임포트
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 임포트

// 로그인 함수
export const getUserLogin = async (LoginData: { email: string, password: string }) => {
  try {
    const response = await login.post('/api/v1/auth/login/', LoginData);
    
    // 서버에서 받은 응답에서 이메일, usertype, 비즈니스 프로필 추출
    const { email, usertype, businessProfile } = response.data;

    // Zustand 스토어에 이메일, usertype 및 비즈니스 프로필 저장
    const setEmail = useAuthStore.getState().setEmail;
    const setUsertype = useAuthStore.getState().setUsertype;
    const setBusinessProfile = useAuthStore.getState().setBusinessProfile;

    setEmail(email);
    setUsertype(usertype);
    setBusinessProfile(businessProfile);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

// 회원가입 함수
export const getUserRegister = async () => {
  return await login.post('/api/v1/auth/register/request/')
    .then(response => response.data);
};
