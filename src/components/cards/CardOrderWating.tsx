import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';
import BookingListApi from '../../axios/BookingListApi';

interface Booking {
  id: number;
  guest: number;
  room: number;
  check_in_datetime: string;
  check_out_datetime: string;
  total_price: number;
  status: string;
  request: string;
  guests_count: number;
  guest_name: string;
  accommodation_name: string;
  room_name: string;
}
interface Prop {
  accommodations?: string;
  room?: string;
  checkIn?: string;
  checkOut?: string;
  user?: string;
  phoneNumber?: string;
  pendingBooking?: Booking[];
  onClose1: () => void;
  onClose2: () => void;
  selectedAccommodation: string | null;
  selectedRoom: string | null;
}

export default function CardOrderWating({
  accommodations = ' 가나다 호텔',
  room = '프리미엄 오션뷰 객실',
  checkIn = '2024.10.14',
  checkOut = '2024.10.15',
  user = '한기선',
  phoneNumber = '01012345678',
  onClose1,
  onClose2,
  pendingBooking,
  selectedAccommodation,
  selectedRoom,
}: Prop) {
  const filteredBookings = pendingBooking?.filter(
    booking =>
      (selectedAccommodation
        ? booking.accommodation_name === selectedAccommodation
        : true) && (selectedRoom ? booking.room_name === selectedRoom : true)
  );
  console.log('filteredBookings', filteredBookings);

  return (
    <>
      {filteredBookings?.map(pend => (
        <div
          key={pend.id}
          className="flex-row p-4 mx-3 my-4 bg-white border-2 border-gray-100 border-solid rounded-md"
        >
          <div className="flex justify-between flex-col">
            <div>
              <p key={pend.id} className="s1 inline-block mr-3">
                {pend.accommodation_name}
              </p>
              <p className="s2">
                {pend.check_in_datetime.split('T')[0]} ~
                {pend.check_out_datetime.split('T')[0]}
              </p>
              <p className="b2 inline-block">{pend.room_name}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="s2">
              <span className="b2">{user}</span> {phoneNumber}
            </p>
            <p className="b2">
              <span>성인</span> <span className="s2">{pend.guests_count}</span>
              {/* 유아<span className="s2">1</span> */}
            </p>
          </div>
          <div className="flex justify-between gap-4 mt-2">
            <Button
              size={BtnSize.l}
              text="예약 취소"
              type={BtnType.err}
              onClick={onClose1}
            />
            <Button
              size={BtnSize.l}
              text="예약 확정"
              type={BtnType.normal}
              onClick={onClose2}
            />
          </div>
        </div>
      ))}
    </>
  );
}
