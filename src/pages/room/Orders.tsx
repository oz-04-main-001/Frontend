import { useNavigate } from 'react-router-dom';
import Button, { BtnType, BtnSize } from '../../assets/buttons/Button';
import Checkbox from '../../assets/Checkbox';
import Divider from '../../assets/Divider';
import InfoTemp from '../../components/InfoTemp1';
import Layout from '../../layouts/Layout1';
import CheckInOut from '../../components/CheckInOut';

export default function Orders({ subTitle = '숙소', title = '객실' }) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/');
  };
  return (
    <>
      <Layout>
        <div className="">
          <div>
            <h6 className="text-gray-500">{subTitle}</h6>
            <h3 className="mt-2">{title}</h3>
            <p className="text-gray-400 b2">기준 2인, 싱글침대 1개, 방 1개</p>
          </div>
          <div className="flex mt-8">
            <CheckInOut title="체크인" date="2025.12.02(월)" time="15:00" />
            <CheckInOut title="체크아웃" date="2025.12.03(화)" time="11:00" />
          </div>
          <p className="mt-6 b2">
            인원<span className="ml-1 b1">성인 명 유아 명</span>
          </p>
        </div>
        <div className="mt-6 text-right text-gray-800 s1">
          111원 <span className="text-gray-400 b2">/4박</span>
        </div>
      </Layout>
      <Divider />
      <Layout>
        <InfoTemp title="예약자 정보" text="한기선/01023445566" />
      </Layout>
      <Divider />
      <Layout>
        <div className="flex flex-col gap-5">
          <Checkbox label="전체동의" size={24} />
          <Checkbox
            label=" 숙소 이용규칙 및 취소/환불규정 동의 (필수)"
            size={24}
          />
          <Checkbox label="개인정보 수집 및 이용 동의 (필수)" size={24} />
          <Checkbox label="개인정보 제3자 제공 동의 (필수)" size={24} />
        </div>
        <div className="my-20">
          <Button
            size={BtnSize.l}
            text="1111원 결제하기"
            type={BtnType.normal}
            onClick={onClick}
          />
        </div>
      </Layout>
    </>
  );
}
