import { useEffect, useState } from 'react';
import Layout from '../../layouts/Layout2';
import Popup from '../../components/Popup';
import HostCalendar from './hostCalender/HostCalendar';
import HostAccommoList from './hostCalender/HostAccommoList';
import usePopupStore from '../../stores/usePopupStore';
import Management from './Management';
import HostAccommodationAPI from '../../axios/HostAccommodationAPI';
import client from '../../axios/client';
import useHostAccommoDeleteStore from '../../stores/useHostAccommoDelete';
import ManagementRequestAPI from '../../axios/ManagementRequestAPI';
import useHostActionStore from '../../stores/useHostActionStore';

export default function HostMain() {
  const popup = usePopupStore(state => state.popup);
  const closePopup = usePopupStore(state => state.closePopup);
  const openPopup = usePopupStore(state => state.openPopup);
  const [popupType, setPopupType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { accommoData, setAccommoData } = HostAccommodationAPI();
  const { isAccommoDeleted, setIsAccommoDeleted } = useHostAccommoDeleteStore();
  const { action, setAction } = useHostActionStore();
  const [bookingId, setBookingId] = useState<number | null>(0);

  // 예약 취소 버튼
  const handleCancelClick = (id: number | null) => {
    console.log(id);
    setPopupType('cancel');
    openPopup();
    setBookingId(id);
  };

  // 예약 확정 버튼
  const handleConfirmClick = (id: number | null) => {
    console.log(id);
    setPopupType('confirm');
    openPopup();
    setBookingId(id);
  };
  //숙소 삭제 팝업- 최종 삭제 버튼
  const handleDeletePopupClick = (id: number | null) => {
    setSelectedId(id);
    setPopupType('delete');
    openPopup();
  };

  const handleManagementCancelClick = (action: 'cancelled') => {
    console.log(action);
    setAction(action);
    closePopup();
  };
  const handleManagementconfirmClick = (action: 'accept') => {
    console.log(action);
    setAction(action);
    closePopup();
  };

  //예약 상태 변경 API

  ManagementRequestAPI(bookingId);

  //숙소 삭제 API
  const handleDeleteData = async (id: number | null) => {
    try {
      setIsAccommoDeleted(true);
      const response = await client.delete(`/api/v1/accommodations/${id}/`);
      setAccommoData(response.data);
      console.log('accommoData', accommoData);
    } catch (error) {
      console.error('deleteArror', error);
    } finally {
      setSelectedId(null);
      setIsAccommoDeleted(false);
      closePopup();
    }
  };
  useEffect(() => {
    if (selectedId !== null) {
      handleDeleteData(selectedId);
    }
  }, [isAccommoDeleted]);

  return (
    <>
      <Layout>
        {popupType === 'cancel' && popup && (
          <Popup
            title="예약취소 하시겠습니까?"
            subTitle=""
            buttonText={{ text1: '취소', text2: '예약취소' }}
            onClickLogic2={() => handleManagementCancelClick('cancelled')}
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        )}
        {popupType === 'confirm' && popup && (
          <Popup
            title="예약 확정 하시겠습니까?"
            subTitle=""
            buttonText={{ text1: '취소', text2: '예약확정' }}
            onClickLogic2={() => handleManagementconfirmClick('accept')}
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        )}
        {popupType === 'delete' && popup && (
          <Popup
            title={`${Array.isArray(accommoData) ? accommoData.find(acco => acco.id === selectedId)?.name : ''}을(를) 삭제하시겠습니까?`}
            buttonText={{ text1: '아니오', text2: '숙소 삭제' }}
            subTitleClass="hidden"
            onClickLogic2={() => {
              if (selectedId !== null) {
                handleDeleteData(selectedId);
              }
            }}
          />
        )}

        <div className="w-full">
          <div className="flex flex-row flex-wrap flex-1 gap-10">
            {/* 캘린더 영역 */}
            <div className="w-full lg:w-7/12">
              <HostCalendar />
              {/* 숙소 목록은 캘린더 아래에 위치 */}
              <HostAccommoList
                handleDeletePopupClick={handleDeletePopupClick}
              />
            </div>

            {/* 사이드바 영역 */}
            <div className="flex-1 lg:w-5/12 sticky top-0">
              <Management
                handleCancelClick={handleCancelClick}
                handleConfirmClick={handleConfirmClick}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
