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
import useHostActionStore from '../../stores/useHostActionStore';

interface responseDataType {
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
  booker_name: string;
  booker_phone_number: string;
}

export default function  HostMain() {
  const popup = usePopupStore(state => state.popup);
  const closePopup = usePopupStore(state => state.closePopup);
  const openPopup = usePopupStore(state => state.openPopup);
  const [popupType, setPopupType] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const { accommoData, setAccommoData } = HostAccommodationAPI();
  const { isAccommoDeleted, setIsAccommoDeleted } = useHostAccommoDeleteStore();
  const { action, setAction } = useHostActionStore();
  const [bookingId, setBookingId] = useState<number | null>(null);
  const [, setRequestData] = useState<responseDataType | null>(null);
  const [, setIsPatched] = useState<boolean>(false); // 예약 취소 버튼
  const [tap, setTap] = useState(0);
  const taps = ['이용 요청', '예약 확정'];
  const handleCancelClick = (id: number) => {
    setBookingId(id); // 선택된 예약 ID 설정
    setPopupType('cancel');
    openPopup();
  };

  // 예약 확정 버튼
  const handleConfirmClick = (id: number) => {
    setBookingId(id); // 선택된 예약 ID 설정
    setPopupType('confirm');
    openPopup();
  };
  //숙소 삭제 팝업- 최종 삭제 버튼
  const handleDeletePopupClick = (id: number) => {
    setSelectedId(id);
    setPopupType('delete');
    openPopup();
  };

  const handleManagementCancelClick = async () => {
    setAction('cancelled');
    await patchRequestData(bookingId); // API 호출
    closePopup(); // 팝업 닫기
  };
  const handleManagementconfirmClick = async () => {
    setAction('accept');
    await patchRequestData(bookingId); // API 호출
    closePopup(); // 팝업 닫기
  };

  //예약 상태 변경 API
  const patchRequestData = async (bookingId: number | null) => {
    try {
      setIsPatched(true);
      const response = await client.patch(`/api/v1/host/requestcheck/`, {
        booking_id: bookingId,
        action: action,
      });
      setRequestData(response.data); // 응답 데이터 저장
      console.log('API 응답:', response.data); // 응답 확인용 로그
    } catch (error) {
      console.error('ManagementRequestAPI Error:', error);
    } finally {
      setIsPatched(false);
      setAction('none'); //
      setBookingId(null); // 초기화
    }
  };

  useEffect(() => {
    if (action !== 'none' && bookingId) {
      console.log('Action updated:', action); // action 상태가 변경된 후 로그 출력
      console.log('bookingId', bookingId);
      patchRequestData(bookingId); // 상태가 변경된 후 API 호출
      closePopup(); // 팝업 닫기
    }
  }, [action]); // action 상태가 변경될 때마다 실행됨

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
    if (selectedId !== null && isAccommoDeleted === true) {
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
            onClickLogic2={() => handleManagementCancelClick()}
            titleClass="font-bold text-2xl"
            subTitleClass="hidden"
          />
        )}
        {popupType === 'confirm' && popup && (
          <Popup
            title="예약 확정 하시겠습니까?"
            subTitle=""
            buttonText={{ text1: '취소', text2: '예약확정' }}
            onClickLogic2={() => handleManagementconfirmClick()}
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
                tap={tap}
                setTap={setTap}
                taps={taps}
              />
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
