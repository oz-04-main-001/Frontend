import Badges from '../../assets/Badges';
import CheckInOut from '../../components/CheckInOut';
import ReservAccoCard from './ReservAccoCard';

export default function AccmoInfoCard({ state = '완료' }) {
  return (
    <div>
      <div className="flex items-center">
        <img
          src="../../assets/icons/arrow3.svg"
          alt="이전 페이지로 돌아가기"
          className="w-6 h-7"
        />
        <span className="text-xl ml-2">예약내역 상세</span>
      </div>
      <div className="mt-11 mb-5">
        <Badges label={'이용완료'} status={state} />
      </div>
      <div className="flex flex-row items-center">
        <img
          src="../../assets/logo"
          alt="숙소 이미지 대체"
          className="w-32 h-32 bg-gray-100 rounded-sm"
        />
        <div className="flex flex-col ml-10">
          <ReservAccoCard />
        </div>
      </div>
      <div className="flex flex-row mt-6 mr-8">
        <CheckInOut />
        <CheckInOut title="체크아웃" date="2025.12.04(수)" time="11:00" />
      </div>
    </div>
  );
}
