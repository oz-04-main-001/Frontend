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
  stateroom?: string;
  checkIn?: string;
  checkOut?: string;
  user?: string;
  phoneNumber?: string;
  onClose3: () => void;
  selectedAccommodation: string | null;
  selectedRoom: string | null;
  confirmedBooking: Booking[] | undefined;
}

export default function CardOrderFix({
  accommodations = '나라마 숙소',
  stateroom = '건강 청정 황토방',
  checkIn = '2024.10.14',
  checkOut = '2024.10.15',
  user = '한기선',
  phoneNumber = '01012345678',
  selectedRoom,
  selectedAccommodation,
  confirmedBooking,
  onClose3,
}: Prop) {
  const { data } = BookingListApi();

  const filteredBookings = confirmedBooking?.filter(
    booking =>
      (selectedAccommodation
        ? booking.accommodation_name === selectedAccommodation
        : true) && (selectedRoom ? booking.room_name === selectedRoom : true)
  );
  return (
    <>
      {filteredBookings?.map(confirm => (
        <div
          key={confirm.id}
          className="flex-row p-5 mx-3 my-4 bg-white border-2 border-gray-100 border-solid rounded-md"
        >
          <div className="flex justify-between flex-col">
            <div>
              <p className="s1 inline-block mr-3">
                {confirm.accommodation_name}
              </p>
              <p className="s2">
                {confirm.check_in_datetime.split('T')[0]} ~
                {confirm.check_out_datetime.split('T')[0]}
              </p>
              <p className="b2 inline-block">{confirm.room_name}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="s2">
              <span className="b2">{user}</span> {phoneNumber}
            </p>
            <p className="b2">
              <span>성인</span>
              <span className="s2">{confirm.guests_count}</span>
              {/* 유아<span className="s2">1</span> */}
            </p>
          </div>
          <div className="flex justify-between gap-4 mt-2">
            <Button
              size={BtnSize.l}
              text="예약 취소"
              type={BtnType.normal}
              onClick={onClose3}
            />
          </div>
        </div>
      ))}
    </>
  );
}
