interface ReservAccoCardProps {
  address?: string;
  accommodation?: string;
  room?: String;
  bedType?: String;
  bedCount?: String;
  roomCount?: String;
}

export default function ReservAccoCard({
  accommodation = '가나다 숙소',
  room = '골져스 파셜오션 더블',
  bedType = '싱글',
  bedCount = '1',
  roomCount = '1',
}: ReservAccoCardProps) {
  return (
    <>
      <p className="my-1 text-3xl font-bold flex leading-9">{accommodation}</p>
      <p className="my-1 text-xl leading-7 text-gray-800">{room}</p>
      <p className="mb-2 text-lg text-gray-400">
        기준 2인, {bedType}침대 {bedCount}개, 방 {roomCount}개
      </p>
    </>
  );
}
