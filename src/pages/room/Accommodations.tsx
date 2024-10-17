import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp1 from '../../components/InfoTemp1';
import InfoTemp2 from '../../components/InfoTemp2';
import CardStateroom from '../../components/cards/CardStateroom';
import Layout from '../../layouts/Layout';
import { DetailType } from '../../components/DetailInfo';
export default function Accommodations() {
  const texts = ['주차가능', '조식운영'];
  return (
    <>
      <Layout>
        <DetailInfo
          subTitle="서울시 서초구 서초동"
          title="서초아파트"
          price={111}
          detailType={DetailType.Accommodations}
        />
      </Layout>
      <Divider />
      <Layout>
        <CardStateroom />
        <CardStateroom />
      </Layout>
      <Divider />
      <Layout>
        <InfoTemp1 title="숙소소개" text="우리숙소 죽인다" />
        <InfoTemp2 title="시설/서비스" texts={texts} />
        <InfoTemp1 title="이용안내" text="전 객실 금연이다" />
        <div className="mb-12">
          <h6 className="mb-4 text-gray-500">환불정책</h6>
          <ul className="text-black s1">
            <li>체크인 7일전, % 환불</li>
            <li>체크인 5일전, % 환불</li>
            <li>체크인 2일전, % 환불</li>
            <li>체크인 1일전, % 환불</li>
            <li>체크인 당일, % 환불</li>
          </ul>
        </div>
      </Layout>
    </>
  );
}
