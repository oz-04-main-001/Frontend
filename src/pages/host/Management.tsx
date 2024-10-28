import { useState } from 'react';
import SegmentMenu from '../../assets/SegmentMenu';
import CardOrder from '../../components/cards/CardOrderWating';
import CardOrderFix from '../../components/cards/CardOrderFix';
import Dropdown from '../../assets/Dropdown';
import useSelectedDateStore from '../../stores/useSelectedDateStore';
import HostAccommodationAPI from '../../axios/HostAccommodationAPI';
import BookingListApi from '../../axios/BookingListApi';

interface ButtonLogicProp {
  handleCancelClick: () => void;
  handleConfirmClick: () => void;
  date: string;
}

export default function Management({
  handleCancelClick,
  handleConfirmClick,
  date,
}: ButtonLogicProp) {
  const [tap, setTap] = useState(0);
  const taps = ['이용 요청', '예약 확정'];
  const [selectedAccommodation, setSelectedAccommodation] = useState<
    string | null
  >(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { selectedDate } = useSelectedDateStore();

  const { accommoData } = HostAccommodationAPI();
  const { data } = BookingListApi();

  const pendingBooking = data?.filter(
    reservation => reservation.status === 'pending'
  );

  const confirmedBooking = data?.filter(
    reservation => reservation.status === 'confirmed'
  );
  const filteredPending = pendingBooking?.filter(pend =>
    accommoData?.filter(acco => acco.name === pend.accommodation_name)
  );
  const nameFilteredPending = filteredPending?.map(item => {
    return item.accommodation_name;
  });

  const roomFilteredPending = filteredPending?.map(item => {
    return item.room_name;
  });
  //
  const filteredConcirmed = confirmedBooking?.filter(confirm =>
    accommoData?.filter(acco => acco.name === confirm.accommodation_name)
  );
  const nameFilteredConcirmed = filteredConcirmed?.map(item => {
    return item.accommodation_name;
  });

  const roomFilteredConcirmed = filteredConcirmed?.map(item => {
    return item.room_name;
  });

  return (
    <>
      <div className="sticky col-span-5 p-5 bg-gray-100 rounded-md top-7 ">
        <div className="relative mb-3">
          <h6 className="text-center">예약관리</h6>
          <p className="absolute right-1 text-gray-800 top-1 text-sm">
            {selectedDate}
          </p>
        </div>
        <div className="pb-2 rounded-md bg-gray-50 ">
          <SegmentMenu taps={taps} active={tap} setActive={setTap} />
          <div className="flex justify-end mt-3 mr-3">
            <Dropdown
              width="90px"
              tap={tap}
              menuItems={
                tap === taps.indexOf('이용 요청')
                  ? nameFilteredPending
                  : nameFilteredConcirmed
              }
              title={'숙소 선택 🔽'}
              selectedItem={selectedAccommodation}
              setSelectedItem={setSelectedAccommodation}
              btnStyle="text-sm pt-1 text-left font-medium"
            />
            <Dropdown
              width="100px"
              tap={tap}
              menuItems={
                tap === taps.indexOf('이용 요청')
                  ? roomFilteredPending
                  : roomFilteredConcirmed
              }
              title={'객실유형 🔽'}
              selectedItem={selectedRoom}
              setSelectedItem={() => setSelectedRoom}
              btnStyle="text-sm pt-1 text-left font-medium"
            />
          </div>
          <div className="h-full relative overflow-y-auto max-h-96">
            {tap === taps.indexOf('이용 요청') ? (
              <CardOrder
                onClose1={handleCancelClick}
                onClose2={handleConfirmClick}
                pendingBooking={pendingBooking}
                selectedAccommodation={selectedAccommodation}
                selectedRoom={selectedRoom}
              />
            ) : (
              <CardOrderFix
                onClose3={handleCancelClick}
                confirmedBooking={confirmedBooking}
                selectedRoom={selectedRoom}
                selectedAccommodation={selectedAccommodation}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
