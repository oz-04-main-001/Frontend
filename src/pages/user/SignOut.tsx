import Popup from "../../components/Popup";

const SignOut = ({ onClose }: { onClose: () => void }) => {
  const handleLogout = () => {
    // 로그아웃 기능을 여기에 추가할 수 있습니다.
    console.log('로그아웃 진행');
    onClose(); // 로그아웃 후 팝업 닫기
  };

  return (
    <Popup
      title="로그아웃 하시겠습니까?"
      subTitle=""
      onClose={onClose}
      buttonText={{ text1: '취소', text2: '로그아웃' }}
      onClickLogic1={onClose} // 취소 버튼 클릭 시 팝업 닫기
      onClickLogic2={handleLogout} // 로그아웃 버튼 클릭 시 로그아웃 기능 호출
      titleClass="font-bold text-2xl"
      subTitleClass="hidden"
    />
  );
};

export default SignOut;
