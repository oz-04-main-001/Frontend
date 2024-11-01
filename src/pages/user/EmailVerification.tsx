import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';
import { Input } from '../../assets/Input';
import axios from 'axios';

interface EmailVerificationProps {
  onClose: () => void;
}

const EmailVerification: React.FC<EmailVerificationProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [otp, setOtp] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const verifyCode = async () => {
    if (!otp || !email) {
      setErrorMessage('이메일과 인증번호를 모두 입력하세요.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost/api/v1/auth/register/verify/',
        { otp, email },
        { withCredentials: true }
      );

      if (response.status === 200 || response.status === 201) {
        alert('인증이 성공적으로 완료되었습니다.');
        onClose();
        navigate('/user/login');
      } else {
        setErrorMessage('인증 실패: 서버에서 승인되지 않았습니다.');
      }
    } catch (error: any) {
      if (error.response) {
        const serverError = error.response.data;
        setErrorMessage(serverError?.message || '잘못된 요청: 필수 입력값이 누락되었거나 형식이 맞지 않습니다.');
      } else {
        setErrorMessage('서버에 연결할 수 없습니다.');
      }
    }
  };

  return (
    <Popup
      title="이메일 인증"
      subTitle="이메일과 인증번호를 입력하세요."
      buttonText={{ text1: '취소', text2: '인증 완료' }}
      onClickLogic1={onClose}
      onClickLogic2={verifyCode}
      onClose={onClose}
    >
      <div className="flex flex-col space-y-4">
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        
        <Input
          type="email"
          id="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
          label="이메일"
          validate={(value: string) => (!value ? '이메일을 입력하세요.' : null)}
          className="w-full"
        />
        
        <Input
          type="text"
          id="otp"
          placeholder="인증번호 입력"
          value={otp}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOtp(e.target.value)}
          label="인증번호"
          validate={(value: string) => (!value ? '인증번호를 입력하세요.' : null)}
          className="w-full"
        />
      </div>
    </Popup>
  );
};

export default EmailVerification;
