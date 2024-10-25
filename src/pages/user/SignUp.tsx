import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../assets/Input';
import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserRegister } from '../../axios/userApi';

const SignUp: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동

  const [selectedGender, setSelectedGender] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [lastName, setLastName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [phoneFirst, setPhoneFirst] = useState('');
  const [phoneMiddle, setPhoneMiddle] = useState('');
  const [phoneLast, setPhoneLast] = useState('');
  const [agreement, setAgreement] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // 비밀번호 유효성 검사 함수
  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value); // 대문자 포함 여부
    const hasNumber = /\d/.test(value); // 숫자 포함 여부
    const hasSpecialChar = /[!@#$%^&*]/.test(value); // 특수문자 포함 여부
    const isLengthValid = value.length >= 8; // 길이 확인
    const hasNoSequentialNumbers = !/(012|123|234|345|456|567|678|789)/.test(
      value
    ); // 연속 숫자 금지

    if (!isLengthValid) {
      return '비밀번호는 최소 8자 이상이어야 합니다.';
    }
    if (!hasUpperCase) {
      return '첫 글자는 대문자여야 합니다.';
    }
    if (!hasNumber) {
      return '숫자를 1개 이상 포함해야 합니다.';
    }
    if (!hasSpecialChar) {
      return '특수문자를 1개 이상 포함해야 합니다.';
    }
    if (!hasNoSequentialNumbers) {
      return '연속된 숫자는 사용할 수 없습니다.';
    }

    return '';
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    setPasswordError('');
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError('');
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handlePhoneFirstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneFirst(e.target.value);
  };

  const handlePhoneMiddleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneMiddle(e.target.value);
  };

  const handlePhoneLastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneLast(e.target.value);
  };

  const handleAgreementChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAgreement(e.target.checked);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const errorMessage = validatePassword(password);
    if (errorMessage) {
      setPasswordError(errorMessage);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
      return;
    }

    if (!agreement) {
      setRegisterError('개인정보 이용 동의가 필요합니다.');
      return;
    }

    const registerData = {
      email,
      password,
      lastName,
      firstName,
      birthdate,
      phone: `${phoneFirst}-${phoneMiddle}-${phoneLast}`, // 전화번호 포맷
      gender: selectedGender,
    };

    try {
      const response = await getUserRegister(registerData);
      // 성공적으로 가입되었을 때 로그인 페이지로 이동
      console.log('회원가입 성공:', response);
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (error) {
      setRegisterError('회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-[500px] bg-gray-50 rounded-md shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <img src="/public/staynest.svg" alt="로고" width="60" height="60" />
      </div>
      <h1 className="mb-6 text-2xl font-bold">&lt; 회원가입</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        {' '}
        {/* onSubmit 핸들러 추가 */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이메일
          </label>
          <Input
            type="text"
            id="email"
            placeholder="이메일"
            onChange={handleEmailChange}
          />
        </div>
        <Input
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          onBlur={() => setPasswordError(validatePassword(password))}
        />
        {passwordError && (
          <p className="mt-1 text-xs text-state-err">{passwordError}</p>
        )}
        <Input
          type="password"
          id="confirmPassword"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          onChange={handleConfirmPasswordChange}
          onBlur={() => {
            if (password !== confirmPassword) {
              setConfirmPasswordError('비밀번호가 일치하지 않습니다.');
            } else {
              setConfirmPasswordError('');
            }
          }}
        />
        {confirmPasswordError && (
          <p className="mt-1 text-xs text-state-err">{confirmPasswordError}</p>
        )}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이름
          </label>
          <div className="flex justify-between">
            <div className="flex-grow min-w-[110px] lg:min-w-[220px]">
              <Input
                type="text"
                id="lastName"
                placeholder="성"
                onChange={handleLastNameChange}
              />
            </div>
            <div className="flex-grow min-w-[110px] lg:min-w-[220px]">
              <Input
                type="text"
                id="firstName"
                placeholder="이름"
                onChange={handleFirstNameChange}
              />
            </div>
          </div>
        </div>
        <Input
          type="text"
          id="birthdate"
          label="생년월일"
          placeholder="생년월일 8자리"
          onChange={handleBirthdateChange}
        />
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            성별
          </label>
          <div className="flex space-x-4">
            <Button
              size={BtnSize.l}
              text="남자"
              type={
                selectedGender === '남자' ? BtnType.primary : BtnType.normal
              }
              className="w-1/2"
              onClick={() => setSelectedGender('남자')}
            />
            <Button
              size={BtnSize.l}
              text="여자"
              type={
                selectedGender === '여자' ? BtnType.primary : BtnType.normal
              }
              className="w-1/2"
              onClick={() => setSelectedGender('여자')}
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            전화번호
          </label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="phoneFirst"
              placeholder="예): 010"
              onChange={handlePhoneFirstChange}
              className="flex-grow min-w-[80px] max-w-[110px]"
            />
            <Input
              type="text"
              id="phoneMiddle"
              placeholder="1234"
              onChange={handlePhoneMiddleChange}
              className="flex-grow min-w-[80px] max-w-[170px]"
            />
            <Input
              type="text"
              id="phoneLast"
              placeholder="5678"
              onChange={handlePhoneLastChange}
              className="flex-grow min-w-[80px] max-w-[170px]"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreement"
            className="mr-2"
            onChange={handleAgreementChange}
          />
          <label htmlFor="agreement" className="text-sm text-gray-700">
            개인정보 이용 동의
          </label>
        </div>
        {registerError && (
          <p className="mt-1 text-xs text-state-err">{registerError}</p>
        )}
        <div className="flex justify-center mt-6">
          <Button
            size={BtnSize.l}
            text="회원가입"
            type={BtnType.submit} // type을 submit으로 설정
            className="w-full max-w-[400px]"
          />
        </div>
      </form>
    </div>
  );
};

export default SignUp;
