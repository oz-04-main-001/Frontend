import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 추가
import { Input } from '../../assets/Input';
import Buttons, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserLogin } from '../../axios/userApi'; // API 함수 임포트

// 로고 컴포넌트
const Logo = () => (
  <div className="mb-6">
    <img src="/public/staynest.svg" alt="로고" width="120" height="0" /> 
  </div>
);

// SignIn 컴포넌트
function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const handleLogin = async () => {
    try {
      const response = await getUserLogin({ email, password }); // 이메일, 비밀번호 전달
      console.log('로그인 성공:', response);
      navigate('/'); // 로그인 성공 시 메인 페이지로 이동
    } catch (error) {
      console.error('로그인 실패:', error);
      // 오류 처리 로직 추가 가능 (예: 알림, 경고 메시지)
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Logo /> {/* 로고 컴포넌트 추가 */}
      <div className="w-full max-w-[400px] flex flex-col">
        <label className="mt-4 text-sm text-left font-regular">이메일</label>
        <Input 
          type="email" 
          id="email" 
          placeholder="이메일" 
          className="mb-4" // 추가적인 스타일 클래스
          validate={(value) => value ? null : '이메일을 입력하세요.'} // 이메일 유효성 검사
          onChange={(e) => setEmail(e.target.value)} // 이메일 입력값 업데이트
        />
        <label className="mt-4 text-sm text-left font-regular">비밀번호</label>
        <Input 
          type="password" 
          id="password" 
          placeholder="비밀번호" 
          className="mb-4" // 추가적인 스타일 클래스
          validate={(value) => value ? null : '비밀번호를 입력하세요.'} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div className="w-1/3 shrink-0">
        <Buttons
          size={BtnSize.l}
          text="로그인"
          type={BtnType.normal}
          onClick={handleLogin} 
        />
      </div>
      <div className="mt-4">
        <Link to="/user/join" className="mr-4 text-sm text-primary-300"> {/* Link로 변경 */}
          회원가입
        </Link>
        <Link to="#" className="text-sm text-primary-300"> {/* Link로 변경 */}
          아이디 /
        </Link>
        <Link to="#" className="text-sm text-primary-300"> {/* Link로 변경 */}
          비밀번호 찾기
        </Link>
      </div>
    </div>
  );
}

export default SignIn;
