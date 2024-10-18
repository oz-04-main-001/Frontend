import Header from './assets/Header';
import CardMypage from './components/cards/CardMypage';

const Mypage = () => {
    const userInfo = {
        name: '오즈님',
        email: 'ozcoding@gmail.com',
        phone: '010 - 1234 - 5678',
    };

    const cards = [
        { imageUrl: 'https://example.com/1.jpg', badgeLabel: '예정', badgeStatus: '예정', accommodationName: '숙소 1', roomName: '룸 1' },
        { imageUrl: 'https://example.com/2.jpg', badgeLabel: '이용중', badgeStatus: '이용중', accommodationName: '숙소 2', roomName: '룸 2' },
        { imageUrl: 'https://example.com/3.jpg', badgeLabel: '완료', badgeStatus: '완료', accommodationName: '숙소 3', roomName: '룸 3' },
        { imageUrl: 'https://example.com/4.jpg', badgeLabel: '취소', badgeStatus: '취소', accommodationName: '숙소 4', roomName: '룸 4' },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header 컴포넌트 */}
            <Header labels={['호스트 모드로 전환', '마이페이지']} />

            {/* 사용자 정보 섹션 */}
            <div className="pt-20 text-center">
                <h1 className="text-3xl font-bold">안녕하세요, {userInfo.name}</h1>
                <p className="text-gray-600">이메일: {userInfo.email}</p>
                <p className="text-gray-600">전화번호: {userInfo.phone}</p>
            </div>

            {/* 마이페이지 카드 섹션 */}
            <div className="grid grid-cols-1 gap-6 mt-8 px-4">
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
        </div>
    );
};

export default Mypage;
