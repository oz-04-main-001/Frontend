import { useNavigate } from 'react-router-dom';
import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp2 from '../../components/InfoTemp2';
import Layout from '../../layouts/Layout1';
import { DetailType } from '../../components/DetailInfo';
import Button from '../../assets/buttons/Button';
import { BtnSize, BtnType } from '../../assets/buttons/Button';

export default function Stateroom() {
  const navigate = useNavigate();
  const onClick = () => {
    navigate('/stateroom/order');
  };
  const texts = ['주차가능', '조식운영'];
  return (
    <>
      <div className="mb-36">
        <Layout>
          <DetailInfo
            subTitle="서울시 서초구 서초동"
            title="서초아파트"
            price={111}
            detailType={DetailType.Stateroom}
          />
        </Layout>
        <Divider />
        <Layout>
          <div className="p-6 border-2 border-gray-100 border-solid rounded-md">
            <div>
              <p className="mb-3 text-gray-800 c1">숙박</p>
              <p className="mb-1 b2">
                체크인 <span className="ml-1 b1">2024.12.02 15:00</span> ~
                체크아웃
                <span className="ml-1 b1">2024.12.02 15:00</span>
              </p>
              <p className=" b2">
                인원<span className="ml-1 b1">성인 명 유아 명</span>
              </p>
            </div>
            <div className="mt-6 text-right text-gray-800 s1">
              111원 <span className="text-gray-400 b2">/4박</span>
            </div>
          </div>
        </Layout>
        <Divider />
        <Layout>
          <InfoTemp2 title="객실 서비스" texts={texts} />
        </Layout>
      </div>

      <div className="fixed bottom-0 flex justify-between w-full px-20 py-4 bg-white border-t-2 border-gray-100 border-solid">
        <div>
          <p className="b2">12.21 ~ 12.11</p>
          <h4>
            1234 <span className="text-gray-400 b1">/1박</span>
          </h4>
        </div>
        <div className="w-1/3 py-2">
          <Button
            size={BtnSize.l}
            text="예약하기"
            type={BtnType.normal}
            onClick={onClick}
          />
        </div>
      </div>
    </>
  );
}
