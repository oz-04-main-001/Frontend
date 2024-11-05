import client from './client'; // axios 인스턴스 임포트
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 임포트

export const getUserLogin = async (LoginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await client.post('/api/v1/auth/login/', LoginData);
    const {
      access_token,
      user_type,
      phone_number,
      name,
      email,
      businessProfile,
    } = response.data;

    if (!access_token || !user_type) {
      throw new Error(
        '서버 응답에서 access_token 또는 user_type이 누락되었습니다.'
      );
    }

    // Store values in localStorage for persistence across page reloads
    localStorage.setItem('auth_token', access_token);
    localStorage.setItem('name', name);
    localStorage.setItem('phNumber', phone_number);
    localStorage.setItem('email', email);
    localStorage.setItem('usertype', user_type);
    localStorage.setItem('businessProfile', JSON.stringify(businessProfile));

    // Update Zustand store state
    const setAuthState = useAuthStore.getState();
    setAuthState.setName(name);
    setAuthState.setPhnumber(phone_number);
    setAuthState.setEmail(email);
    setAuthState.setUsertype(user_type);
    setAuthState.setBusinessProfile(businessProfile);

    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};

export const getUserRegister = async (userData: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
  password2: string;
  birth_date: string;
  gender: string;
  phone_number: string;
}) => {
  return await client
    .post('/api/v1/auth/register/request/', userData, {
      headers: {
        'Content-Type': 'application/json', // 명시적으로 헤더 추가
      },
    })
    .then(response => response.data)
    .catch(error => {
      console.error('회원가입 중 오류 발생:', error.response.data); // 오류 데이터 로깅
      throw error; // 오류를 다시 던져서 호출한 곳에서 처리할 수 있도록
    });
};

export const postUserDelete = async () => {
  return await client
    .post('/api/v1/auth/delete/request/')
    .then(response => response.data);
};
