import Badges, { BadgeStatus } from '../../assets/Badges';
import CheckInOut from '../../components/CheckInOut';
import ReservAccoCard from './ReservAccoCard';
import Logo from '../../../public/staynest.svg';
import Arrow from '../../assets/icons/arrow3.svg?react';
import Pin from '../../assets/icons/pin.svg?react';
import { useEffect } from 'react';
import useErrorImage from '../../customHooks/useErrorImage';

interface Bed {
  total_beds: number;
  bed_names: string[];
}
interface AccmoInfoCardProps {
  status: BadgeStatus;
  image?: string;
  address?: string;
  accommodationName?: string;
  stateRoomName: string;
  guestsCount: number;
  bed: Bed;
  checkIn: string;
  checkOut: string;
}

export default function AccomoInfoCard({
  status,
  address,
  image = '/staynest.svg',
  accommodationName,
  stateRoomName,
  guestsCount,
  bed,
  checkIn,
  checkOut,
}: AccmoInfoCardProps): JSX.Element {
  const handleErrorImage = useErrorImage();

  return (
    <div>
      <div className="flex items-center text-gray-800">
        <Arrow width={24} height={24} />
        <h5 className="pl-2 mt-1"> 예약내역 상세</h5>
      </div>
      <div className="mb-5 mt-11">
        <Badges status={status} />
      </div>
      <div className="flex flex-row items-center">
        <div className="w-1/5 overflow-hidden bg-gray-100 border-2 border-gray-200 rounded-md">
          <img
            src={image}
            alt="숙소 이미지 대체"
            className="w-full"
            onError={handleErrorImage}
          />
        </div>

        <div className="flex flex-col justify-center ml-10">
          <div className="text-gray-400 text-2xs">
            <Pin width={24} height={24} />
            {address}
          </div>
          <ReservAccoCard
            accommodation={accommodationName}
            room={stateRoomName}
            guestsCount={guestsCount}
            bedType={bed.bed_names}
            bedCount={bed.total_beds}
            roomCount={2}
          />
        </div>
      </div>
      <div className="flex flex-row mt-6">
        <CheckInOut title="체크인" date={checkIn} />
        <CheckInOut title="체크아웃" date={checkOut} />
      </div>
    </div>
  );
}
