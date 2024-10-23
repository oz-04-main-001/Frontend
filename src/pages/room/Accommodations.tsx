import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp1 from '../../components/InfoTemp1';
import InfoTemp2 from '../../components/InfoTemp2';
import CardStateroom from '../../components/cards/CardStateroom';
import Layout from '../../layouts/Layout1';
import { DetailType } from '../../components/DetailInfo';
import Header from '../../assets/Header';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccommodationsLoad } from '../../axios/roomApi';
import { AxiosError } from 'axios';
import { useAccommodationsStore } from '../../stores/useAccommodationsStore';

export default function Accommodations() {
  const texts = ['주차가능', '조식운영'];
  const { accommodationId } = useParams();
  const { accommodation, actions } = useAccommodationsStore();
  useEffect(() => {
    const fetchGetLoad = async () => {
      try {
        const loadCard = await getAccommodationsLoad(Number(accommodationId));
        actions.setAccommodationsInfo(loadCard);
        actions.setAccommodationId(Number(accommodationId));
        console.log(accommodation);
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
            subTitle={accommodation.address}
            title={accommodation.name}
            price={accommodation.min_price}
            detailType={DetailType.Accommodations}
          />
        </Layout>
        <Divider />
        <Layout>
          {accommodation.rooms.map(room => {
            return (
              <CardStateroom
                key={room.accommodation_name}
                image="/staynest.svg"
                title={room.accommodation_name}
                checkIn={room.check_in_time}
                checkOut={room.check_out_time}
                price={room.price}
                stayType={room.stay_type}
                capacity={room.capacity}
              />
            );
          })}
        </Layout>
        <Divider />
        <Layout>
          <InfoTemp1 title="숙소소개" text={accommodation.description} />
          <InfoTemp2 title="시설/서비스" texts={texts} />
          <InfoTemp1 title="이용안내" text={accommodation.rules} />
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
