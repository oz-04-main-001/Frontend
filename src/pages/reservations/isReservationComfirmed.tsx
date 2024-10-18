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
        <div className="flex justify-between pl-44 mt-3 text-gray-500 p-4 bg-white">
          <p className="font-bold text-lg">예약 취소</p>
          <img
            src="../../assets/icons/arrow.svg"
            alt="오른쪽 화살표"
            className="mr-44"
          />
        </div>
      </div>
    </>
  );
}
