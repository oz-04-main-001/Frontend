import Header from '../../assets/Header';
import CardMypage from '../../components/cards/CardMypage';
import { BadgeStatus } from '../../assets/Badges';
import useAuthStore from '../../stores/useAuthStore';
import usePopupStore from '../../stores/usePopupStore';
import WarningNotice from './WarningNotice';
import { useState } from 'react';
import MembershipWithdrawal from './MembershipWithdrawal';

const Mypage = () => {
  const email = useAuthStore.getState().email;
  const popup = usePopupStore(state => state.popup);
  const closePopup = usePopupStore(state => state.closePopup);
  const userInfo = {
    name: '오즈님',
    email: 'ozcoding@gmail.com',
    phone: '010 - 1234 - 5678',
  };
  const [leave, setLeave] = useState(false);
  const cards = [
    {
      imageUrl: 'https://example.com/1.jpg',
      badgeLabel: '예정',
      badgeStatus: BadgeStatus.예정,
      accommodationName: '숙소 1',
      roomName: '룸 1',
    },
    {
      imageUrl: 'https://example.com/2.jpg',
      badgeLabel: '이용중',
      badgeStatus: BadgeStatus.이용중,
      accommodationName: '숙소 2',
      roomName: '룸 2',
    },
    {
      imageUrl: 'https://example.com/3.jpg',
      badgeLabel: '완료',
      badgeStatus: BadgeStatus.완료,
      accommodationName: '숙소 3',
      roomName: '룸 3',
    },
    {
      imageUrl: 'https://example.com/4.jpg',
      badgeLabel: '취소',
      badgeStatus: BadgeStatus.취소,
      accommodationName: '숙소 4',
      roomName: '룸 4',
    },
  ];
  const popupShow = () => {
    if (popup && !leave) return <WarningNotice setLeave={setLeave} />;
    if (popup && leave) return <MembershipWithdrawal />;
  };
  return (
    <div>
      <Header
        labels={[
          { title: '호스트 모드로 전환', link: '/host' },
          { title: '마이페이지', link: '/mypage' },
        ]}
      />
      <div className="pt-20 text-center">
        <h1 className="text-3xl font-bold">안녕하세요, {userInfo.name}</h1>
        <p className="text-gray-600">이메일: {userInfo.email}</p>
        <p className="text-gray-600">전화번호: {userInfo.phone}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 px-4 mt-8">
        {cards.map((card, index) => (
          <CardMypage
            key={index}
            imageUrl={card.imageUrl}
            badgeLabel={card.badgeLabel}
            badgeStatus={card.badgeStatus}
            accommodationName={card.accommodationName}
            roomName={card.roomName}
          />
        ))}
      </div>
      <div
        className="text-center text-gray-400 b1 mt-14"
        onClick={() => {
          closePopup();
        }}
      >
        회원탈퇴
      </div>
      {popupShow()}
    </div>
  );
};

export default Mypage;
