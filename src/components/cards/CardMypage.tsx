import Badges from '../../assets/Badges';

interface CardProps {
  imageUrl: string;        // 숙소 이미지 URL
  badgeLabel: string;      // 벳지 텍스트
  badgeStatus: '예정' | '이용중' | '완료' | '취소'; // 벳지 상태
  accommodationName: string; // 숙소 이름
  roomName: string;        // 객실 이름
}

export function CardMypage({
  imageUrl,
  badgeLabel = "예정", // 기본값으로 "예정" 사용
  badgeStatus = "예정", // 기본값으로 "예정" 사용
  accommodationName, // accommodationName 추가
  roomName,          // roomName 추가
}: CardProps) {
  return (
    <div className="border border-gray-200 rounded-lg shadow-lg w-[1400px] flex">
      {/* 이미지 섹션 */}
      <div className="w-[150px] h-[150px]">
        <img src={imageUrl} alt="숙소 이미지" className="w-full h-full object-cover rounded-l-lg" />
      </div>

      {/* 텍스트 섹션 */}
      <div className="p-4 flex flex-col justify-center space-y-2">
        {/* 벳지 컴포넌트 */}
        <Badges label={badgeLabel} status={badgeStatus} />

        {/* 숙소 이름 */}
        <h2 className="text-lg font-medium text-black">{accommodationName}</h2>

        {/* 객실 이름 */}
        <p className="text-gray-500 text-sm">{roomName}</p>
      </div>
    </div>
  );
}

export default CardMypage;

// import { CardMypage } from './components/cards/CardMypage'; 

// const App = () => {
//   const exampleData = {
//     imageUrl: 'https://example.com/accommodation.jpg', // 실제 이미지 URL로 교체하세요.
//     badgeLabel: '예정',
//     badgeStatus: '예정',
//     accommodationName: '멋진 숙소',
//     roomName: '디럭스 룸',
//   };

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">
//       <CardMypage
//         imageUrl={exampleData.imageUrl}
//         badgeLabel={exampleData.badgeLabel}
//         badgeStatus={exampleData.badgeStatus}
//         accommodationName={exampleData.accommodationName}
//         roomName={exampleData.roomName}
//       />
//     </div>
//   );
// };

// export default App;
