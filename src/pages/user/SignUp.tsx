//전화번호에 - 포함하기

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../assets/Input';
import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserRegister } from '../../axios/userApi';

const SignUp: React.FC = () => {
  const navigate = useNavigate();

  const [selectedGender, setSelectedGender] = useState<'male' | 'female' | null>(null);
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

    // 필수 필드 체크
    if (!email || !password || !firstName || !lastName || !birthdate || !selectedGender || !phoneFirst || !phoneMiddle || !phoneLast) {
      setRegisterError('모든 필드를 올바르게 입력해 주세요.');
      return;
    }

    // 필수 필드 체크
  if (
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !birthdate ||
    !selectedGender ||
    !phoneFirst ||
    !phoneMiddle ||
    !phoneLast
  ) {
    setRegisterError('모든 필드를 올바르게 입력해 주세요.');
    return;
  }

    // 전화번호 형식 조합
    const phoneNumber = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;
    
    const registerData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      birth_date: birthdate,
      gender: selectedGender,
      phone_number: phoneNumber // 조합된 전화번호 사용
    };
    
    console.log('회원가입 데이터:', registerData); 

    try {
      const response = await getUserRegister(registerData);
      console.log('회원가입 성공:', response);
      navigate('/login'); // 로그인 페이지로 리다이렉트
    } catch (error: any) {
      console.error('회원가입 중 오류 발생:', error.response.data);
      setRegisterError(error.response?.data?.message || '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  return (
    <div className="container mx-auto px-6 py-12 max-w-[500px] bg-gray-50 rounded-md shadow-lg">
      <div className="flex items-center justify-center mb-8">
        <img src="/public/staynest.svg" alt="로고" width="60" height="60" />
      </div>
      <h1 className="mb-6 text-2xl font-bold">&lt; 회원가입</h1>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">이메일</label>
          <Input type="text" id="email" placeholder="이메일" onChange={handleEmailChange} />
        </div>
        <Input
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호"
          onChange={handlePasswordChange}
          onBlur={() => setPasswordError(validatePassword(password))}
        />
        {passwordError && <p className="mt-1 text-xs text-state-err">{passwordError}</p>}
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
        {confirmPasswordError && <p className="mt-1 text-xs text-state-err">{confirmPasswordError}</p>}
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
          type="date"
          id="birthdate"
          label="생년월일"
          placeholder="YYYY-MM-DD"
          value={birthdate}
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
              type={selectedGender === 'male' ? BtnType.normal : BtnType.normal}
              className="w-1/2"
              onClick={() => setSelectedGender('male')}
            />
            <Button
              size={BtnSize.l}
              text="여자"
              type={selectedGender === 'female' ? BtnType.normal : BtnType.normal}
              className="w-1/2"
              onClick={() => setSelectedGender('female')}
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
              placeholder="010"
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
              className="flex-grow min-w-[80px] max-w-[110px]"
            />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreement"
            checked={agreement}
            onChange={handleAgreementChange}
            className="mr-2"
          />

          <label htmlFor="agreement" className="text-sm text-gray-600">개인정보 이용 동의</label>
        </div>
        {registerError && <p className="mt-1 text-xs text-state-err">{registerError}</p>}
        <Button type={BtnType.submit} text="회원가입" />
      </form>
    </div>
  );
};

export default SignUp;
