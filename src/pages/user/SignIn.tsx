import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Input } from '../../assets/Input';
import Buttons, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserLogin } from '../../axios/userApi.ts';

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setErrorMessage(''); // Clear previous errors
    try {
      await getUserLogin({ email, password });

      navigate('/');
    } catch (error) {
      setErrorMessage(
        '로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="mb-6">
        <img src="/staynest.svg" alt="로고" width="120" />
      </div>
      <div className="w-full max-w-[400px] flex flex-col">
        <label className="mt-4 text-sm text-left font-regular">이메일</label>
        <Input
          type="email"
          id="email"
          placeholder="이메일"
          className="mb-4"
          validate={value => (value ? null : '이메일을 입력하세요.')}
          onChange={e => setEmail(e.target.value)}
        />
        <label className="mt-4 text-sm text-left font-regular">비밀번호</label>
        <Input
          type="password"
          id="password"
          placeholder="비밀번호"
          className="mb-4"
          validate={value => (value ? null : '비밀번호를 입력하세요.')}
          onChange={e => setPassword(e.target.value)}
        />
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
      </div>
      <div className="w-1/4 shrink-0">
        <Buttons
          size={BtnSize.l}
          text={loading ? '로그인 중...' : '로그인'}
          type={BtnType.normal}
          onClick={handleLogin}
          disabled={loading}
        />
      </div>
      <div className="mt-4">
        <Link to="/user/join" className="mr-4 text-sm text-primary-300">
          회원가입
        </Link>
      </div>
    </div>
  );
};

export default SignIn;
