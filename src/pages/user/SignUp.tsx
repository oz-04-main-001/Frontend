import React, { useState } from 'react';
import { Input } from '../../assets/Input';
import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';
import { getUserRegister } from '../../axios/userApi';
import EmailVerification from './EmailVerification';
import usePopupStore from '../../stores/usePopupStore';

const SignUp: React.FC = () => {
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

  // Zustand의 팝업 상태 가져오기
  const openPopup = usePopupStore(state => state.openPopup);
  const closePopup = usePopupStore(state => state.closePopup);
  const popupVisible = usePopupStore(state => state.popup);

  const validatePassword = (value: string) => {
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasSpecialChar = /[!@#$%^&*]/.test(value);
    const isLengthValid = value.length >= 8;

    const hasNoSequentialNumbers = !/(012|123|234|345|456|567|678|789)/.test(value);

    if (!isLengthValid) return '비밀번호는 최소 8자 이상이어야 합니다.';
    if (!hasUpperCase) return '첫 글자는 대문자여야 합니다.';
    if (!hasNumber) return '숫자를 1개 이상 포함해야 합니다.';
    if (!hasSpecialChar) return '특수문자를 1개 이상 포함해야 합니다.';
    if (!hasNoSequentialNumbers) return '연속된 숫자는 사용할 수 없습니다.';

    return '';
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

    if (
      !email ||
      !password ||
      !firstName ||
      !confirmPassword ||
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

    const phoneNumber = `${phoneFirst}-${phoneMiddle}-${phoneLast}`;

    const registerData = {
      email,
      first_name: firstName,
      last_name: lastName,
      password,
      password2: confirmPassword,
      birth_date: birthdate,
      gender: selectedGender,
      phone_number: phoneNumber,
    };

    try {
      const response = await getUserRegister(registerData);
      console.log('회원가입 성공:', response);
      openPopup(); // 회원가입 성공 시 팝업 열기
    } catch (error: any) {
      console.error('회원가입 중 오류 발생:', error.response.data);
      setRegisterError(
        error.response?.data?.message ||
          '회원가입 중 오류가 발생했습니다. 다시 시도해 주세요.'
      );
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
          <label className="block mb-1 text-sm font-medium text-gray-700">
            이메일
          </label>
          <Input
            type="text"
            id="email"
            placeholder="이메일"
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <Input
          type="password"
          id="password"
          label="비밀번호"
          placeholder="비밀번호"
          onChange={e => setPassword(e.target.value)}
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
          onChange={e => setConfirmPassword(e.target.value)}
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
                onChange={e => setLastName(e.target.value)}
              />
            </div>
            <div className="flex-grow min-w-[110px] lg:min-w-[220px]">
              <Input
                type="text"
                id="firstName"
                placeholder="이름"
                onChange={e => setFirstName(e.target.value)}
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
          onChange={e => setBirthdate(e.target.value)}
        />

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">성별</label>
          <div className="flex space-x-4">
            <Button
              size={BtnSize.l}
              text={selectedGender === 'male' ? "남자 ✔" : "남자"} // 선택 시 체크 표시 추가
              type={BtnType.normal}
              className={`w-1/2 ${selectedGender === 'male' ? 'bg-[#0378D6]' : 'bg-primary-300'}`}
              onClick={() => setSelectedGender('male')}
            />
            <Button
              size={BtnSize.l}
              text={selectedGender === 'female' ? '여자 ✔' : '여자'} // 선택 시 체크 표시 추가

              type={BtnType.normal}
              className={`w-1/2 ${selectedGender === 'female' ? 'bg-[#0378D6]' : 'bg-primary-300'}`}
              onClick={() => setSelectedGender('female')}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">전화번호</label>
          <div className="flex space-x-2">
            <Input
              type="text"
              id="phoneFirst"
              placeholder="010"
              onChange={e => setPhoneFirst(e.target.value)}
              className="flex-grow min-w-[80px] max-w-[110px]"
            />
            <Input
              type="text"
              id="phoneMiddle"
              placeholder="1234"
              onChange={e => setPhoneMiddle(e.target.value)}
              className="flex-grow min-w-[80px] max-w-[170px]"
            />
            <Input
              type="text"
              id="phoneLast"
              placeholder="5678"
              onChange={e => setPhoneLast(e.target.value)}
              className="flex-grow min-w-[80px] max-w-[170px]"
            />
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="agreement"
            checked={agreement}
            onChange={e => setAgreement(e.target.checked)}
            className="mr-2"
          />

          <label htmlFor="agreement" className="text-sm text-gray-600">개인정보 이용 동의</label>
        </div>

        {registerError && <p className="mt-1 text-xs text-state-err">{registerError}</p>}
        <Button 
          type={BtnType.submit} 
          text="회원가입"
          size={BtnSize.l}
        />
      </form>

      {popupVisible && (
        <EmailVerification onClose={closePopup} />
      )}
    </div>
  );
};

export default SignUp;
