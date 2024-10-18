// 이메일 인증 팝업
import Popup from './components/Popup';
import Button, { BtnSize, BtnType } from './assets/buttons/Button'; // BtnSize와 BtnType을 import
import { Input } from './assets/Input';

const EmailVerification = ({ onClose }: { onClose: () => void }) => {
  const handleRequestVerification = () => {
    console.log('인증번호 요청');
    // 추가 로직을 여기에 작성할 수 있습니다.
  };

  const handleCompleteVerification = () => {
    console.log('인증번호 완료 요청');
    // 추가 로직을 여기에 작성할 수 있습니다.
  };

  return (
    <Popup
      title="이메일 인증"
      onClose={onClose}
      subTitle=""
      buttonText={{ text1: '취소', text2: '확인' }}
      onClickLogic1={onClose} // 취소 버튼 로직
      onClickLogic2={onClose} // 확인 버튼 로직 (필요시 추가 로직을 여기에 추가할 수 있습니다)
      titleClass="font-bold text-2xl"
      subTitleClass="hidden"
      containerClass="w-auto h-auto"
    >
      <div className="flex flex-col space-y-4">
        <label className="text-sm" htmlFor="email">
          이메일
        </label>
        
        {/* 이메일 입력과 '@' 기호, 도메인 입력란, 인증번호 요청 버튼을 한 줄로 배치 */}
        <div className="flex items-baseline space-x-2">
          <Input
            id="email"
            type="email"
            placeholder="이메일 입력"
            className="flex-grow w-60" // 너비 조정
          />
          <span>@</span>
          <Input
            id="domain"
            type="text"
            placeholder="도메인 입력"
            className="w-32" // 너비 조정
          />
          <Button
            size={BtnSize.l}
            text="인증번호 요청"
            type={BtnType.popup}
            onClick={handleRequestVerification}
            className="w-40" // 너비 조정
          />
        </div>

        <label className="text-sm" htmlFor="verificationCode">
          인증번호
        </label>
        
        {/* 인증번호 입력란과 버튼을 한 줄로 배치 */}
        <div className="flex items-baseline space-x-2">
          <Input
            id="verificationCode"
            type="text"
            placeholder="인증번호 입력"
            className="flex-grow w-[410px]" 
          />
          <Button
            size={BtnSize.l}
            text="인증번호 완료 요청"
            type={BtnType.popup}
            onClick={handleCompleteVerification}
            className="w-10" 
          />
        </div>

        <div className="flex items-center mt-4">
          <input type="checkbox" id="privacyAgreement" />
          <label className="ml-2" htmlFor="privacyAgreement">
            개인정보 이용 동의
          </label>
        </div>
      </div>
    </Popup>
  );
};

export default EmailVerification;
