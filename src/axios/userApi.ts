import client from './client'; // axios 인스턴스 임포트
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 임포트

// 로그인 함수
export const getUserLogin = async (LoginData: {
  email: string;
  password: string;
}) => {
  try {
    const response = await client.post('/api/v1/auth/login/', LoginData);

    // 서버에서 받은 응답에서 access_token 및 user_type 추출
    const { access_token, user_type } = response.data;

    // access_token을 사용자 유형에 따라 로컬 스토리지에 저장
    if (access_token) {
      console.log('Access token received:', access_token);
      
      // 사용자 유형에 따른 키 설정
      const tokenKey = user_type === 'guest' ? 'guest_token' : 'host_token';
      localStorage.setItem(tokenKey, access_token);

      // 저장 후 확인
      console.log('Stored access token:', localStorage.getItem(tokenKey));
    }

    // 이메일, usertype, 비즈니스 프로필 추출
    const { email, businessProfile } = response.data;

    // Zustand 스토어에 이메일, usertype 및 비즈니스 프로필 저장
    const setEmail = useAuthStore.getState().setEmail;
    const setUsertype = useAuthStore.getState().setUsertype;
    const setBusinessProfile = useAuthStore.getState().setBusinessProfile;

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
  phone_number: string 
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
