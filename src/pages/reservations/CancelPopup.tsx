import { useNavigate, useParams } from 'react-router-dom';
import { putBookingCancel } from '../../axios/orderApi';
import Popup from '../../components/Popup';
import RefundNotice from './RefundNotice';
import ReservAccoCard from './ReservAccoCard';
import { OrderInfo } from './ReservationCompleted';
import usePopupStore from '../../stores/usePopupStore';
interface CancelPopupProps {
  orderInfo: OrderInfo | null;
}
const CancelPopup: React.FC<CancelPopupProps> = ({ orderInfo }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const closePopup = () => {
    usePopupStore.getState().closePopup();
  };
  const fetchGetLoad = async () => {
    if (orderId) {
      await putBookingCancel(orderId);
      navigate(`/reservation/stateroom/order/info/${orderId}`, {
        replace: true,
      });
      closePopup();
      window.location.reload();
    } else {
      console.error('Order ID is undefined');
    }
  };

  return (
    <Popup
      title="예약 취소"
      buttonText={{ text1: '이전', text2: '예약 취소 확정' }}
      onClickLogic2={() => {
        fetchGetLoad();
      }}
    >
      <div className="flex flex-col text-left">
        <ReservAccoCard
          accommodation={orderInfo?.accommodation_info.name}
          room={orderInfo?.room_info.name}
          guestsCount={orderInfo?.guests_count}
          bedType={null}
          bedCount={orderInfo?.room_info.bed_info.total_beds}
          roomCount={orderInfo?.room_info.room_count}
        />
        <div className="text-base text-">
          <span className="text-xs text-gray-800">
            {orderInfo?.check_in_datetime} ~ {orderInfo?.check_out_datetime}
          </span>
        </div>
        <div>
          <RefundNotice />
        </div>
        <div>
          <p className="my-1 mt-3 font-bold text-gray-500 text-large">
            결제 정보
          </p>
          <p className="flex justify-between">
            <span className="inline-block mt-1 text-medium">결제 금액</span>{' '}
            <span className="inline-block text-xl">
              {orderInfo?.total_price}원
            </span>
          </p>
          <hr className="mt-3" />
          <p className="flex justify-between my-5 text-2xl text-state-err">
            <span className="inline-block text-xl">환불 예정 금액</span>
            <span className="inline-block text-black">
              {orderInfo?.total_price}원
            </span>
          </p>
        </div>
      </div>
    </Popup>
  );
};
export default CancelPopup;
