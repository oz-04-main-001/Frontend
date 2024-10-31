import Popup from '../..//components/Popup';
import Button, { BtnSize, BtnType } from '../..//assets/buttons/Button'; // BtnSize와 BtnType을 import
import { Input } from '../..//assets/Input';
import { postUserDelete } from '../../axios/userApi';

const MembershipWithdrawal = () => {
  const handleRequestVerification = () => {
    console.log('인증번호 요청');
    // 추가 로직을 여기에 작성할 수 있습니다.
  };

  const handleCompleteVerification = async () => {
    await postUserDelete();
    await console.log('k');
  };

  return (
    <Popup
      title="회원탈퇴"
      subTitle=""
      buttonText={{ text1: '취소', text2: '탈퇴완료' }}
      onClickLogic2={handleCompleteVerification}
      titleClass="font-bold text-2xl"
      subTitleClass="hidden"
      containerClass="w-auto h-auto"
    >
      <div className="flex flex-col space-y-4">
        <label className="text-sm" htmlFor="email">
          이메일
        </label>

        <div className="flex items-baseline space-x-2">
          <Input
            id="email"
            type="email"
            placeholder="이메일 입력"
            className="flex-grow w-70"
          />
          <span>@</span>
          <Input
            id="domain"
            type="text"
            placeholder="도메인 입력"
            className="w-32"
          />
          <Button
            size={BtnSize.l}
            text="인증번호 요청"
            type={BtnType.popup}
            onClick={handleRequestVerification}
            className="w-30"
          />
        </div>

        <label className="text-sm" htmlFor="verificationCode">
          인증번호
        </label>

        <div className="flex items-baseline space-x-2">
          <Input
            id="verificationCode"
            type="text"
            placeholder="인증번호 입력"
            className="flex-grow w-[420px]"
          />
          <Button
            size={BtnSize.l}
            text="탈퇴완료"
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

export default MembershipWithdrawal;
