import { useState } from 'react';
import SegmentMenu from '../../assets/SegmentMenu';
import CardOrder from '../../components/cards/CardOrderWating';
import CardOrderFix from '../../components/cards/CardOrderFix';
import Dropdown from '../../assets/Dropdown';
import BookingListApi from '../../axios/BookingListApi';
import useSelectedDateStore from '../../stores/useSelectedDateStore';


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
  const AccommodationsArr = ['a', 'b'];
  const room = ['a', 'b'];
  const [selectedAccommodation, setSelectedAccommodation] = useState<
    string | null
  >(null);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const { selectedDate } = useSelectedDateStore();

  const { data } = BookingListApi();
  console.log(data);
  return (
    <>
      <div className="sticky col-span-5 p-5 bg-gray-100 rounded-md top-7 ">
        <div className="relative mb-3">
          <h6 className="text-center">예약관리</h6>
          <p className="absolute right-1 text-gray-800 top-1 s2">
            {selectedDate}
          </p>
        </div>
        <div className="pb-2 rounded-md bg-gray-50 ">
          <SegmentMenu taps={taps} active={tap} setActive={setTap} />
          <div className="flex justify-end mt-3 mr-3">
            <Dropdown
              width="90px"
              menuItems={AccommodationsArr}
              title={'숙소 🔽'}
              selectedItem={selectedAccommodation}
              setSelectedItem={setSelectedAccommodation}
              btnStyle="text-sm pt-1 text-left font-medium"
            />
            <Dropdown
              width="100px"
              menuItems={room}
              title={'객실유형 🔽'}
              selectedItem={selectedRoom}
              setSelectedItem={setSelectedRoom}
              btnStyle="text-sm pt-1 text-left font-medium"
            />
          </div>
          <div className="h-full relative ">
            {tap === taps.indexOf('이용 요청') ? (
              <CardOrder
                onClose1={handleCancelClick}
                onClose2={handleConfirmClick}
              />
            ) : (
              <CardOrderFix onClose3={handleCancelClick} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
