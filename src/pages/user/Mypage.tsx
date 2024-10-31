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
  user_type: 'guest' | 'host';
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
  const { popup, openPopup, closePopup } = usePopupStore(); // openPopup 함수 추가
  const [leave, setLeave] = useState(false);

  useEffect(() => {
    const fetchGetLoad = async () => {
      const mypageInfo = await getUserOrderList();
      setUserInfo(mypageInfo);
    };
    fetchGetLoad();
  }, []);

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
            if (userInfo?.login_user.user_type === 'guest') {
              navigate('/HostDocuments');
            } else {
              navigate('/host');
            }
          }}
        >
          {userInfo?.login_user.name}님 호스트가 되어보세요.
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
