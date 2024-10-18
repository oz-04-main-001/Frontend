import PaymentInfo from './PaymentInfo';
import AccmoInfoCard from './AccmoInfoCard';
import GuestInfo from './GuestInfo';

export default function ReservationCompleted({}) {
  const Pagenation = () => {};
  return (
    <div className="flex flex-col bg-gray-50 w-svw h-svh">
      <div className=" pt-24 pl-48 pb-8 bg-white">
        <AccmoInfoCard />
      </div>
      <div className="mt-3 pl-48 pt-8 pb-14 bg-white">
        <GuestInfo />
      </div>
      <div className="mt-3 pl-48 pt-8 pb-14 flex flex-row w-screen bg-white">
        <PaymentInfo />
      </div>
      <div>
        <button type="button" onClick={Pagenation} className=""></button>
      </div>
    </div>
  );
}
