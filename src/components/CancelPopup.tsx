import Popup from './Popup'; // Adjust the path as necessary

const CancelPopup = ({ onClickLogic1, onClickLogic2, onClose }) => {
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
        <p className="my-1 text-3xl font-bold flex ">가나다 호텔</p>
        <p className="my-1 text-xl leading-8 text-gray-800">
          골져스 파셜오션 더블
        </p>
        <p className="mb-2 text- text-gray-400">
          기준 2인, 싱글침대 1개, 방 1개
        </p>
        <div className="text-base">
          <span className="text-xs text-gray-800">체크인</span> 2024.12.02 15:00{' '}
          ~ <span className="text-xs text-gray-800">체크아웃 </span> 2024.12.03
          11:00
        </div>
        <p className="mt-4 mb-1 text-xl">취소 및 환불규정</p>
        <p>객실별 취소 정책이 상이하니 객실 상세정보에서 확인해주세요.</p>
        <div className="">
          <p className="text-xl font-bold mt-3 my-1">결제 정보</p>
          <p className="flex justify-between">
            결제 금액: <span className="inline-block">34,000원</span>
          </p>
          <hr />
          <p className="text-state-err text-[24px] flex justify-between">
            환불 예정 금액: <p className="inline-block text-black">34,000원</p>
          </p>
        </div>
      </div>
    </Popup>
  );
};
export default CancelPopup;
