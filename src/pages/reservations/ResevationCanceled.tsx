import { BadgeStatus } from '../../assets/Badges';
import AccomoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';
import PaymentInfo from './PaymentInfo';
import RefundNotice from './RefundNotice';
import ReservationButtonTemp from './ReservationButtonTemp';

interface CancelProps {
  label?: string;
  status?: BadgeStatus;
}

export default function ReservationCanceled({
  label = '취소',
  status = BadgeStatus.취소,
}: CancelProps) {
  return (
    <>
      <div className="flex flex-col bg-gray-50 w-svw max-h-fit">
        <div className=" pt-24 pl-44 pb-8 bg-white">
          <AccomoInfoCard status={status} label={label} />
        </div>
        <div className="mt-3 pl-44 pt-8 pb-14 bg-white">
          <GuestInfo />
        </div>
        <div className="mt-3 pl-44 pt-8 pb-14 w-screen bg-white">
          <RefundNotice />
        </div>
        <div className="mt-3 pl-44 pt-8 pb-14 flex flex-row w-screen bg-white">
          <PaymentInfo />
        </div>
        <button>
          <ReservationButtonTemp status={BadgeStatus.취소} />
        </button>
      </div>
    </>
  );
}
