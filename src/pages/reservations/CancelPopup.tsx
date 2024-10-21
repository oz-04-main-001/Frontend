import Popup from '../../components/Popup';
import RefundNotice from './RefundNotice';
import ReservAccoCard from './ReservAccoCard';

const CancelPopup = ({
  onClickLogic1 = () => {},
  onClickLogic2 = () => {},
  onClose = () => {},
}) => {
  return (
    <Popup
      title="예약 취소"
      onClose={onClose}
      buttonText={{ text1: '이전', text2: '예약 취소 확정' }}
      containerClass="w-[60rem]"
      onClickLogic1={onClickLogic1}
      onClickLogic2={onClickLogic2}
    >
      <div className="text-left flex flex-col">
        <ReservAccoCard />
        <div className="text-base text-">
          <span className="text-xs text-gray-800">체크인</span> 2024.12.02 15:00{' '}
          ~ <span className="text-xs text-gray-800">체크아웃 </span> 2024.12.03
          11:00
        </div>
        <div>
          <RefundNotice />
        </div>
        <div className="my-">
          <p className="font-bold mt-3 my-1 text-large text-gray-500">
            결제 정보
          </p>
          <p className="flex justify-between">
            <span className="inline-block text-medium mt-1">결제 금액</span>{' '}
            <span className="inline-block text-xl">34,000원</span>
          </p>
          <hr className="mt-3" />
          <p className=" my-5 text-state-err text-2xl flex justify-between">
            <span className="inline-block text-xl">환불 예정 금액</span>{' '}
            <span className="inline-block text-black">34,000원</span>
          </p>
        </div>
      </div>
    </Popup>
  );
};
export default CancelPopup;
