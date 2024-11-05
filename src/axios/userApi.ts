import client from './client'; // axios 인스턴스 임포트
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 임포트

export const getUserLogin = async (LoginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await client.post('/api/v1/auth/login/', LoginData);
    const { access_token, user_type } = response.data;

    if (!access_token || !user_type) {
      throw new Error(
        '서버 응답에서 access_token 또는 user_type이 누락되었습니다.'
      );
    }

    if (access_token) {
      localStorage.setItem('auth_token', access_token); // auth_token 키 사용
    }

    const { phone_number, name, email, businessProfile } = response.data;
    const setEmail = useAuthStore.getState().setEmail;
    const setUsertype = useAuthStore.getState().setUsertype;
    const setBusinessProfile = useAuthStore.getState().setBusinessProfile;
    const setName = useAuthStore.getState().setName;
    const setPhnumber = useAuthStore.getState().setPhnumber;
    setName(name);
    setPhnumber(phone_number);
    setEmail(email);
    setUsertype(user_type); // user_type을 저장
    setBusinessProfile(businessProfile);

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
