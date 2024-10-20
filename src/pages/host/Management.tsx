import { useState } from 'react';
import SegmentMenu from '../../assets/SegmentMenu';
import Layout from '../../layouts/Layout2';
import CardOrder from '../../components/cards/CardOrderWating';
import Popup from '../../components/Popup';
import CardOrderFix from '../../components/cards/CardOrderFix';
import Dropdown from '../../assets/Dropdown';
import HostCalendar from './hostCalender/HostCalendar';

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
  const StateRoom = ['a', 'b'];
  return (
    <Layout>
      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          캘린더 <HostCalendar />
        </div>

        <div className="sticky col-span-1 p-8 bg-gray-100 rounded-md top-7 ">
          <div className="relative mb-3">
            <h6 className="text-center">예약관리</h6>
            <p className="absolute right-0 text-gray-800 top-1 s2">24.10.14</p>
          </div>
          <div className="col-span-1 pb-2 rounded-md bg-gray-50">
            <SegmentMenu taps={taps} active={tap} setActive={setTap} />
            <div className="flex justify-end gap-3">
              <Dropdown width="90px" menuItems={AccommodationsArr} />
              <Dropdown width="90px" menuItems={StateRoom} />
            </div>

            <div className="h-full">
              {tap === taps.indexOf('이용 요청') ? (
                <CardOrder onClose1={onClose1} onClose2={onClose2} />
              ) : (
                <CardOrderFix onClose2={onClose2} />
              )}
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
