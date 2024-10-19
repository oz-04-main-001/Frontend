import Badges from '../../assets/Badges';
import CheckInOut from '../../components/CheckInOut';
import ReservAccoCard from './ReservAccoCard';

interface AccmoInfoCardProps {
  status: string;
  label?: string;
  address?: string;
}

export default function AccmoInfoCard({
  status = '완료',
  label = '이용완료',
  address = '강원도 강릉시 강릉구 강릉대로 123길',
}: AccmoInfoCardProps) {
  console.log('Badges에 전달된 상태:', status);
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
        <Badges label={label} status={status} />
      </div>
      <div className="flex flex-row items-center">
        <img
          src="../../assets/logo"
          alt="숙소 이미지 대체"
          className="w-32 h-32 bg-gray-100 rounded-sm"
        />
        <div className="flex flex-col ml-10">
          <span className="text-gray-400 text-2xs">
            <img
              src="src/assets/icons/pin.svg"
              alt="지도 핀 이미지"
              className="inline-block"
            />
            {address}
          </span>
          <ReservAccoCard />
        </div>
      </div>
      <div className="flex flex-row mt-6">
        <CheckInOut />
        <CheckInOut title="체크아웃" date="2025.12.04(수)" time="11:00" />
      </div>
    </div>
  );
}
