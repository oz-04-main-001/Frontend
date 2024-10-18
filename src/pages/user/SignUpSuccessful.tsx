import Popup from "../../components/Popup";

const SignUpSuccessful: React.FC = () => {
  const handleLogin = () => {
    console.log("로그인 클릭됨");
  };

  return (
    <Popup
      title="회원가입이 되어있습니다."
      onClose={() => console.log("팝업 닫힘")}
      buttonText={{ text1: '닫기', text2: '로그인 하기' }} // 버튼 텍스트 수정
      onClickLogic1={() => { } } // 비밀번호 찾기 클릭 로직을 빈 함수로
      onClickLogic2={handleLogin} // 로그인 클릭 로직
      children={undefined}    >
    </Popup>
  );
};

export default SignUpSuccessful;
