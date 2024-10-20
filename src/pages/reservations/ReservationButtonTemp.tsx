import arrow from '../../assets/icons/arrow.svg';
interface ReservationButtonProps {
  status: React.ReactNode;
}
export default function ReservationButtonTemp({
  status,
}: ReservationButtonProps) {
  let btnText: string = '예약 취소';

  if (status === '취소') {
    btnText = '취소 진행 현황';
  }
  return (
    <>
      <div className=" mt-3 pl-44 pr-44 pt-8 pb-14 flex flex-row justify-between w-screen bg-white">
        <span className="text-gray-500 text-large font-bold">{btnText}</span>
        <img src={arrow} alt="오른쪽 화살표" className="w-7 h-10" />
      </div>
    </>
  );
}
