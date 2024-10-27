import Popup from '../../components/Popup';

interface WarningNoticeProps {
  setLeave: React.Dispatch<React.SetStateAction<boolean>>;
}
const WarningNotice: React.FC<WarningNoticeProps> = ({ setLeave }) => {
  return (
    <Popup
      title="잠깐만요!"
      subTitle="탈퇴하기 전!"
      buttonText={{ text1: '취소', text2: '탈퇴 진행' }}
      onClickLogic2={() => {
        setLeave(prev => !prev);
      }}
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
