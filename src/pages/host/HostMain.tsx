import { useState } from 'react';
import Layout from '../../layouts/Layout2';
import Popup from '../../components/Popup';
import HostCalendar from './hostCalender/HostCalendar';
import HostAccommoList from './hostCalender/HostAccommoList';
import usePopupStore from '../../stores/usePopupStore';
import Management from './Management';
import AccommodationAPI from './managementAPI/AccommodationAPI';

export default function HostMain() {
  const popup = usePopupStore(state => state.popup);
  const closePopup = usePopupStore(state => state.closePopup);
  const openPopup = usePopupStore(state => state.openPopup);
  const [popupType, setPopupType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { data } = AccommodationAPI();

  // 예약 취소 버튼
  const handleCancelClick = () => {
    setPopupType('cancel');
    openPopup();
  };

  // 예약 확정 버튼
  const handleConfirmClick = () => {
    setPopupType('confirm');
    openPopup();
  };
  const handleDeleteClick = (id: number) => {
    setSelectedId(id);
    setPopupType('delete');
    openPopup();
  };

  return (
    <>
      <Layout>
        {popupType === 'cancel' && popup && (
          <Popup
            title="예약취소 하시겠습니까?"
            subTitle=""
            buttonText={{ text1: '취소', text2: '예약취소' }}
            onClickLogic2={closePopup} // 추후 변경
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        )}
        {popupType === 'confirm' && popup && (
          <Popup
            title="예약 확정 하시겠습니까?"
            subTitle=""
            buttonText={{ text1: '취소', text2: '예약확정' }}
            onClickLogic2={closePopup} // 추후 변경
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        )}
        {popupType === 'delete' && popup && (
          <Popup
            title={`${data.find(acco => acco.id === selectedId)?.name}을(를) 삭제하시겠습니까?`}
            buttonText={{ text1: '아니오', text2: '숙소 삭제' }}
            subTitleClass="hidden"
          />
        )}

        <div className="grid grid-cols-12 gap-4 w-full">
          <div className="col-span-7">
            <HostCalendar />
          </div>
          <Management
            date={'2024-10-25'}
            handleCancelClick={handleCancelClick}
            handleConfirmClick={handleConfirmClick}
          />
          <div className="col-span-7">
            <HostAccommoList handleDeleteClick={handleDeleteClick} />
          </div>
        </div>
      </Layout>
    </>
  );
}
