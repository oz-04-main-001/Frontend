import React, { useState, useEffect } from 'react';
import Popup from '../../components/Popup';

const SignUpSuccessful: React.FC = () => {
  const [showPopup, setShowPopup] = useState(true);

  const handleLogin = () => {
    console.log('로그인 클릭됨');
    // 로그인 페이지 이동 로직 추가 가능
  };

  useEffect(() => {
    // SignUpSuccessful 페이지에 들어오면 팝업 표시
    setShowPopup(true);
  }, []);

  return (
    <div>
      {showPopup && (
        <Popup
          title="회원가입이 되어있습니다."
          onClose={() => {
            setShowPopup(false); // 팝업 닫기
            console.log('팝업 닫힘');
          }}
          buttonText={{ text1: '닫기', text2: '로그인 하기' }} // 버튼 텍스트 수정
          onClickLogic2={handleLogin} // '로그인 하기' 버튼 클릭 시 로그인 로직 호출
        />
      )}
    </div>
  );
};

export default SignUpSuccessful;
