import AccmoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';
import PaymentInfo from './PaymentInfo';
import RefundNotice from './RefundNotice';

export default function IsReservationConfirmed() {
  return (
    <>
      <div className="flex flex-col bg-gray-50 w-svw max-h-fit">
        <div className=" pt-24 pl-48 pb-8 bg-white">
          <AccmoInfoCard />
        </div>
        <div className="mt-3 pl-48 pt-8 pb-14 bg-white">
          <GuestInfo />
        </div>
        <div className="mt-3 pl-48 pt-8 pb-14 w-screen bg-white">
          <RefundNotice />
        </div>
        <div className="mt-3 pl-48 pt-8 pb-14 flex flex-row w-screen bg-white">
          <PaymentInfo />
        </div>
        <div className="mt-3 pl-48 pt-8 pb-14 flex flex-row w-screen bg-white">
          예약 취소 <img src="../../assets/icons/arrow.svg" alt="" />
        </div>
      </div>
    </>
  );
}
