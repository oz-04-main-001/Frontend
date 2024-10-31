import InfoTemp from '../../components/InfoTemp1';

interface GuestInfoProp {
  bookerName: string;
  bookerPhoneNumber: string;
  reservationNumber: number | string;
}

export default function GuestInfo({
  bookerName,
  bookerPhoneNumber,
  reservationNumber,
}: GuestInfoProp) {
  return (
    <>
      <InfoTemp
        title="예약자 정보"
        text={`${bookerName}/ ${bookerPhoneNumber}`}
        divStyle="mb-4"
        divStyle2="text-medium font-medium text-gray-700"
      />
      <p className="">
        <span className="mr-4">예약번호</span>
        <span className="text-gray-700 s1">{reservationNumber}</span>
      </p>
    </>
  );
}
