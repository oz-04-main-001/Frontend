import AccmoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';
import PaymentInfo from './PaymentInfo';
import RefundNotice from './RefundNotice';

export default function IsReservationConfirmed({ state = '대기' }) {
  return (
    <>
      <div className="flex flex-col bg-gray-50 w-svw max-h-fit">
        <div className=" pt-24 pl-44 pb-8 bg-white">
          <AccmoInfoCard state="state" />
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
        <div className=" mt-3 pl-44 pr-44 pt-8 pb-14 flex flex-row justify-between w-screen bg-white">
          <span className="text-gray-500 text-large font-bold">예약 취소</span>
          <img src="../../assets/icons/arrow.svg" alt="오른쪽 화살표" />
        </div>
      </div>
    </>
  );
}
