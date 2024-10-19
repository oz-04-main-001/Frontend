import Popup from './components/Popup';

const WarningNotice = () => {
  const handleClose = () => {
    // 팝업 닫기 로직
  };

  const handleCancel = () => {
    // 취소 버튼 클릭 시 동작할 로직
  };

  const handleProceed = () => {
    // 탈퇴 진행 버튼 클릭 시 동작할 로직
  };

  return (
    <Popup
      title="잠깐만요!"
      onClose={handleClose}
      subTitle="탈퇴하기 전!"
      buttonText={{ text1: '취소', text2: '탈퇴 진행' }}
      onClickLogic1={handleCancel}
      onClickLogic2={handleProceed}
    >
      <div className="flex flex-col items-center mt-4">
        <p>예약한 내용을 체크하셨나요?</p>
        <p>사업자 등록 내용을 체크하셨나요?</p>
        <p className="text-red-600">
          체크하지 않으셨다면 체크를 꼭! 해주시고 탈퇴해주세요!
        </p>
      </div>
    </Popup>
  );
};

export default WarningNotice;
