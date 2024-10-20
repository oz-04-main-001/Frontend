import { useNavigate } from 'react-router-dom';
import { Input } from '../../assets/Input';
import Buttons, { BtnSize, BtnType } from '../../assets/buttons/Button';
interface ButtonProps {
  label: string;
}

// 버튼 컴포넌트
export function LoginButton({ label }: ButtonProps) {
  return (
    <button className="w-full max-w-[300px] h-[38px] bg-blue-500 text-white text-sm rounded-md">
      {label}
    </button>
  );
}

// 로고 컴포넌트
const Logo = () => (
  <div className="mb-6">
    <h1 className="text-2xl font-bold">로고</h1>
  </div>
);

// SignIn 컴포넌트로 이름 변경
function SignIn() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <Logo /> {/* 로고 컴포넌트 추가 */}
      <div className="w-full max-w-[400px] flex flex-col">
        <label className="mt-4 text-sm text-left font-regular">이메일</label>
        <Input type="email" id="email" placeholder="이메일" />
        <label className="mt-4 text-sm text-left font-regular">비밀번호</label>
        <Input type="password" id="password" placeholder="비밀번호" />
      </div>
      <div className="w-1/2 shrink-0">
        <Buttons
          size={BtnSize.l}
          text="로그인"
          type={BtnType.normal}
          onClick={onClick}
        />
      </div>
      <div className="mt-4">
        <a href="#" className="mr-4 text-sm text-blue-500">
          회원가입
        </a>
        <a href="#" className="text-sm text-blue-500">
          아이디 /
        </a>
        <a href="#" className="text-sm text-blue-500">
          비밀번호 찾기
        </a>
      </div>
    </div>
  );
}

export default SignIn;
