import { useNavigate } from 'react-router-dom';
import Popup from '../../components/Popup';
import usePopupStore from '../../stores/usePopupStore';
import useAuthStore from '../../stores/useAuthStore';
import client from '../../axios/client';

const SignOut = () => {
  const navigate = useNavigate();
  const { closePopup } = usePopupStore();
  const clearAuth = useAuthStore(state => state.clearAuth);
  const handleLogout = async () => {
    console.log('로그아웃 진행');
    console.log('로그아웃 전 상태:', useAuthStore.getState());

    try {
      // 서버에 로그아웃 요청
      await client.post('/api/v1/auth/logout/');
    } catch (error) {
      console.error('로그아웃 요청 오류:', error);
    }

    // 로컬 스토리지에서 통합된 auth_token 및 refresh_token 삭제
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');

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
        onClickLogic2={handleLogout}
        titleClass="font-bold text-2xl"
        subTitleClass="hidden"
      />
    </>
  );
};

export default SignOut;
