import Header from '../../assets/Header';
import CardMypage from '../../components/cards/CardMypage';
import { BadgeStatus } from '../../assets/Badges';
import usePopupStore from '../../stores/usePopupStore';
import WarningNotice from './WarningNotice';
import { useEffect, useState } from 'react';
import MembershipWithdrawal from './MembershipWithdrawal';
import { getUserOrderList } from '../../axios/orderApi';
import Divider from '../../assets/Divider';
import { useNavigate } from 'react-router-dom';

interface UserInfo {
  email: string;
  name: string;
  phone_number: string;
  user_type: 'guest' | 'host' | 'admin';
}
interface Booking {
  accommodation_img: string | null;
  accommodation_name: string;
  id: number;
  room_name: string;
  status: BadgeStatus;
}
interface MypageInfo {
  login_user: UserInfo;
  bookings: Booking[];
}

const Mypage = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState<MypageInfo>();
  const { popup, openPopup } = usePopupStore();
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const fetchGetLoad = async () => {
      const mypageInfo = await getUserOrderList();
      setUserInfo(mypageInfo);
    };
    fetchGetLoad();
  }, []);

  const hostPageBtn = () => {
    switch (userInfo?.login_user.user_type) {
      case 'guest':
        return `${userInfo?.login_user.name}님 호스트가 되어보세요.`;
      case 'host':
        return `${userInfo?.login_user.name}님 숙소를 관리해보세요.`;
      case 'admin':
        return `${userInfo?.login_user.name}님 슈퍼 계정이시네요. 저희 사이트를 경험해보세요..`;
      default:
        return `${userInfo?.login_user.name}님 호스트가 되어보세요.`;
    }
  };

  return (
    <div>
      <Header />
      <div className="pt-20 text-center">
        <h1 className="text-3xl font-bold">
          안녕하세요, {userInfo?.login_user.name}
        </h1>
        <p className="text-gray-600">이메일: {userInfo?.login_user.email}</p>
        <p className="text-gray-600">
          전화번호: {userInfo?.login_user.phone_number}
        </p>
        <div
          className="mt-6 text-gray-400 cursor-pointer c1"
          onClick={() => {
            if (userInfo?.login_user.user_type === 'guest' || 'admin') {
              navigate('/onlyhost/host-documents');
            } else {
              navigate('/host');
            }
          }}
        >
          {hostPageBtn()}
        </div>
      </div>
      <Divider />
      <div className="px-4 mt-8 ">
        {userInfo?.bookings.map(card => {
          return (
            <CardMypage
              key={card?.id}
              id={card?.id}
              imageUrl={card?.accommodation_img}
              badgeStatus={card?.status}
              accommodationName={card.accommodation_name}
              roomName={card.room_name}
            />
          );
        })}
      </div>
      <div
        className="text-center text-gray-400 cursor-pointer b1 mt-14"
        onClick={() => {
          setLeave(false);
          openPopup();
        }}
      >
        회원탈퇴
      </div>

      {popup && !leave && <WarningNotice setLeave={setLeave} />}
      {popup && leave && <MembershipWithdrawal />}
    </div>
  );
};

export default Mypage;
