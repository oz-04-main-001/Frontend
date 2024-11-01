import { ReactNode } from 'react';
import Button, { BtnSize, BtnType } from '../../assets/buttons/Button';

interface Booking {
  booker_phone_number: ReactNode;
  booker_name: ReactNode;
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
  onClose3: (id: number) => void;
  selectedAccommodation: string | null;
  selectedRoom: string | null;
  confirmedBooking: Booking[] | undefined;
}

export default function CardOrderFix({
  selectedRoom,
  selectedAccommodation,
  confirmedBooking,
  onClose3,
}: Prop) {
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
          <div className="flex flex-col justify-between">
            <div>
              <p className="inline-block mr-3 s1">
                {confirm.accommodation_name}
              </p>
              <p className="s2">
                {confirm.check_in_datetime.split('T')[0]} ~
                {confirm.check_out_datetime.split('T')[0]}
              </p>
              <p className="inline-block b2">{confirm.room_name}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="s2">
              <span className="b2">{confirm.booker_name}</span>
              <span className="inline-block px-2">/</span>
              {confirm.booker_phone_number}
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
              onClick={() => onClose3(confirm.id)}
            />
          </div>
        </div>
      ))}
    </>
  );
}
