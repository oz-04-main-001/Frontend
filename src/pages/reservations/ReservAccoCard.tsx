interface ReservAccoCardProps {
  address?: string;
  accommodation?: string;
  guestsCount?: string | number;
  room?: string;
  bedType?: null;
  bedCount?: number | null;
  roomCount?: number;
}

export default function ReservAccoCard({
  accommodation,
  room,
  guestsCount,
  bedType,
  bedCount,
  roomCount,
}: ReservAccoCardProps) {
  return (
    <>
      <p className="flex my-1 text-3xl font-bold leading-9">{accommodation}</p>
      <p className="my-1 text-xl leading-7 text-gray-800">{room}</p>
      <p className="mb-2 text-lg text-gray-400">
        {guestsCount}인, {bedType}침대 {bedCount}개, 방 {roomCount}개
      </p>
    </>
  );
}
