import { useNavigate } from 'react-router-dom';
import Popup from "../../components/Popup";
import usePopupStore from "../../stores/usePopupStore";
import useAuthStore from "../../stores/useAuthStore"; 

const SignOut = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 useNavigate 훅
  const { closePopup } = usePopupStore(); // 팝업 상태 가져오기
  const clearAuth = useAuthStore(state => state.clearAuth); // 액세스 토큰 및 사용자 유형 초기화

  const handleLogout = () => {
    console.log('로그아웃 진행');
    console.log('로그아웃 전 상태:', useAuthStore.getState()); 

    const userType = useAuthStore.getState().usertype; 
    const tokenKey = userType === 'guest' ? 'guest_token' : 'host_token'; // 사용자 유형에 따른 키 설정

    // 로컬스토리지에서 액세스 토큰 삭제
    localStorage.removeItem(tokenKey);

    // Zustand 스토어 초기화
    clearAuth();

    console.log('로그아웃 후 상태:', useAuthStore.getState()); 

    closePopup();
    navigate('/'); 
  };  

  const handleCancel = () => {
    console.log('취소 클릭');
    closePopup();
    navigate('/'); 
  };

  return (
    <>
      <Popup
        title="로그아웃 하시겠습니까?"
        subTitle=""
        onClose={handleCancel}
        buttonText={{ text1: '취소', text2: '로그아웃' }}
        onClickLogic1={handleCancel} // 취소 클릭 시 handleCancel 호출
        onClickLogic2={handleLogout}
        titleClass="font-bold text-2xl"
        subTitleClass="hidden"
      />
    </>
  );
};

export default SignOut;
