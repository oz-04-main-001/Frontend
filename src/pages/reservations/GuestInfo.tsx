import InfoTemp from "../../components/InfoTemp1";


export default function GuestInfo({ reservationNumber = '20241017233555' }) {
  return (
    <>
      <InfoTemp
        title="예약자 정보"
        text="손수민/010-1234-5678"
        divStyle="mb-4"
        divStyle2="text-medium font-medium text-gray-700"
      />
      <p className="flex justify-between w-64">
        <span className="">예약번호</span>
        <span className="text-gray-700 font-medium">{reservationNumber}</span>
      </p>
    </>
  );
}
