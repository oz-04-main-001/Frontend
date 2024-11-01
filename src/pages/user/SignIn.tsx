import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../assets/Input';
import Buttons, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserLogin } from '../../axios/userApi';
import useAuthStore from '../../stores/useAuthStore';  // Zustand 스토어 임포트

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // 로그인 핸들러
  const handleLogin = async () => {
    try {
      await getUserLogin({ email, password });
      console.log('로그인 성공:', email);
      // 로그인 성공 후 메인 페이지로 이동
      navigate('/');
    } catch (error) {
      console.error('로그인 실패:', error);
      setErrorMessage('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-6">
        <img src="/public/staynest.svg" alt="로고" width="120" />
      </div>
      <div className="w-full max-w-[400px] flex flex-col">
        <label className="mt-4 text-sm text-left font-regular">이메일</label>
        <Input
          type="email"
          id="email"
          placeholder="이메일"
          className="mb-4"
          validate={(value) => (value ? null : '이메일을 입력하세요.')}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="mt-4 text-sm text-left font-regular">비밀번호</label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          className="mb-4"
          validate={(value) => (value ? null : '비밀번호를 입력하세요.')}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      <div className="w-1/4 shrink-0">
        <Buttons
          size={BtnSize.l}
          text="로그인"
          type={BtnType.normal}
          onClick={handleLogin}
        />
      </div>
      <div className="mt-4">
        <Link to="/user/join" className="mr-4 text-sm text-primary-300">회원가입</Link>
        <Link to="#" className="text-sm text-primary-300">아이디 /</Link>
        <Link to="#" className="text-sm text-primary-300">비밀번호 찾기</Link>
      </div>
    </div>
  );
};

export default SignIn;
