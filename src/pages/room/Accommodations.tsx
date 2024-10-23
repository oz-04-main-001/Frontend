import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp1 from '../../components/InfoTemp1';
import InfoTemp2 from '../../components/InfoTemp2';
import CardStateroom from '../../components/cards/CardStateroom';
import Layout from '../../layouts/Layout1';
import { DetailType } from '../../components/DetailInfo';
import Header from '../../assets/Header';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAccommodationsLoad } from '../../axios/accommodationApi';
import { AxiosError } from 'axios';
interface FetchAccommodationInfo {
  hotel_img: string;
  name: string;
  address: string;
  min_price: string;
  rooms: string;
  phone_number: string;
  description: string;
  rules: string;
  host: 0;
}
export default function Accommodations() {
  const texts = ['주차가능', '조식운영'];
  const navigate = useNavigate();
  const [accommodationInfo, setAccommodationInfo] =
    useState<FetchAccommodationInfo[]>();
  useEffect(() => {
    const fetchGetLoad = async () => {
      try {
        const loadCard = await getAccommodationsLoad(1);
        setAccommodationInfo(loadCard);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const statusCode = axiosError.response.status;
          switch (statusCode) {
            case 401:
              // navigate('/user/login');
              break;
            default:
              console.log('요청 에러');
              break;
          }
        }
      }
    };
    fetchGetLoad();
  }, []);

  return (
    <>
      <Header />
      <div className="mt-32">
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
      </div>
    </>
  );
}
