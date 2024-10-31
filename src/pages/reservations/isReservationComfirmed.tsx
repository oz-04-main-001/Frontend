import { BadgeStatus } from '../../assets/Badges';
import AccmoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';
import PaymentInfo from './PaymentInfo';
import RefundNotice from './RefundNotice';
import ReservationButtonTemp from './ReservationButtonTemp';

interface confirmProps {
  status: BadgeStatus;
}

export default function IsReservationConfirmed({ status }: confirmProps) {
  console.log('IsReservationConfirmed:', status);
  return (
    <>
      <div className="flex flex-col bg-gray-50 w-svw max-h-fit">
        <div className=" pt-24 pl-44 pb-8 bg-white">
          <AccmoInfoCard status={status} />
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
        <div>
          <ReservationButtonTemp status={status} />
        </div>
      </div>
    </>
  );
}
