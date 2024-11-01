import { useParams } from 'react-router-dom';
import { putBookingCancel } from '../../axios/orderApi';
import Popup from '../../components/Popup';
import RefundNotice from './RefundNotice';
import ReservAccoCard from './ReservAccoCard';

const CancelPopup: React.FC = () => {
  const { orderId } = useParams();
  const fetchGetLoad = async () => {
    if (orderId) {
      await putBookingCancel(orderId);
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
        <ReservAccoCard />
        <div className="text-base text-">
          <span className="text-xs text-gray-800">체크인</span> 2024.12.02 15:00{' '}
          ~ <span className="text-xs text-gray-800">체크아웃 </span> 2024.12.03
          11:00
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
            <span className="inline-block text-xl">34,000원</span>
          </p>
          <hr className="mt-3" />
          <p className="flex justify-between my-5 text-2xl text-state-err">
            <span className="inline-block text-xl">환불 예정 금액</span>
            <span className="inline-block text-black">34,000원</span>
          </p>
        </div>
      </div>
    </Popup>
  );
};
export default CancelPopup;
