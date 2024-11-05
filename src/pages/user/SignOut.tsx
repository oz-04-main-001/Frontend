import { useNavigate } from 'react-router-dom';
import Popup from "../../components/Popup";
import usePopupStore from "../../stores/usePopupStore";
import useAuthStore from "../../stores/useAuthStore"; 
import client from '../../axios/client'; 

const SignOut = () => {
  const navigate = useNavigate(); 
  const { closePopup } = usePopupStore(); 
  const clearAuth = useAuthStore(state => state.clearAuth); 
  const handleLogout = async () => {
  

    try {
      await client.post('/api/v1/auth/logout/');
    } catch (error) {
      console.error('로그아웃 요청 오류:', error);
    }

    try {
      await client.post('/api/v1/auth/logout/'); 
    } catch (error) {
      console.error('로그아웃 요청 오류:', error);
    }
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');

    clearAuth();

    closePopup();
    navigate('/');
  };

  const handleCancel = () => {
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
        onClickLogic1={handleCancel} 
        onClickLogic2={handleLogout}
        titleClass="font-bold text-2xl"
        subTitleClass="hidden"
      />
    </>
  );
};

export default SignOut;
