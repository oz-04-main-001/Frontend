import { useState } from 'react';
import SegmentMenu from '../../assets/SegmentMenu';
import Layout from '../../layouts/Layout2';
import CardOrder from '../../components/cards/CardOrderWating';
import Popup from '../../components/Popup';
import CardOrderFix from '../../components/cards/CardOrderFix';
import Dropdown from '../../assets/Dropdown';
import HostCalendar from './hostCalender/HostCalendar';
import HostAccmoList from './hostCalender/HostAccmoList';

export default function Management() {
  const [tap, setTap] = useState(0);
  const [cancelPopup, setCancelPopup] = useState<boolean>(false);
  const [fixPopup, setFixPopup] = useState<boolean>(false);
  const taps = ['이용 요청', '예약 확정'];
  const onClose1 = (): void => {
    setCancelPopup(prev => !prev);
  };
  const onClose2 = (): void => {
    setFixPopup(prev => !prev);
  };
  const onCancel = () => {};

  const AccommodationsArr = ['a', 'b'];
  const room = ['a', 'b'];
  return (
    <>
      <Layout>
        {cancelPopup ? (
          <Popup
            title="예약취소 하시겠습니까?"
            subTitle=""
            onClose={onClose1}
            buttonText={{ text1: '취소', text2: '예약취소' }}
            onClickLogic1={onClose1}
            onClickLogic2={onCancel}
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        ) : undefined}
        {fixPopup ? (
          <Popup
            title="예약 확정 하시겠습니까?"
            subTitle=""
            onClose={onClose2}
            buttonText={{ text1: '취소', text2: '예약확정' }}
            onClickLogic1={onClose2}
            onClickLogic2={onCancel}
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        ) : undefined}
        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-7">
            <HostCalendar />
          </div>

          <div className="sticky col-span-5 p-5 bg-gray-100 rounded-md top-7 ">
            <div className="relative mb-3">
              <h6 className="text-center">예약관리</h6>
              <p className="absolute right-0 text-gray-800 top-1 s2">
                24.10.14
              </p>
            </div>
            <div className="pb-2 rounded-md bg-gray-50 ">
              <SegmentMenu taps={taps} active={tap} setActive={setTap} />
              <div className="flex justify-end mt-3 mr-3">
                <Dropdown
                  width="90px"
                  menuItems={AccommodationsArr}
                  title={'숙소 🔽'}
                  selectedItem={'숙소 🔽'}
                  setSelectedItem={function (_item: string): void {
                    throw new Error('Function not implemented.');
                  }}
                  onClick={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                  btnStyle="text-sm pt-1 text-left font-medium"
                />
                <Dropdown
                  width="100px"
                  menuItems={room}
                  selectedItem={'객실유형 🔽'}
                  setSelectedItem={function (_item: string): void {
                    throw new Error('Function not implemented.');
                  }}
                  onClick={function (_item: string): void {
                    throw new Error('Function not implemented.');
                  }}
                  btnStyle="text-sm pt-1 text-left font-medium"
                />
              </div>
              <div className="h-full relative ">
                {tap === taps.indexOf('이용 요청') ? (
                  <CardOrder onClose1={onClose1} onClose2={onClose2} />
                ) : (
                  <CardOrderFix onClose2={onClose2} />
                )}
              </div>
            </div>
          </div>
          <div className="col-span-7">
            <HostAccmoList />
          </div>
        </div>
      </Layout>
    </>
  );
}
