import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp1 from '../../components/InfoTemp1';
import InfoTemp2 from '../../components/InfoTemp2';
import CardStateroom from '../../components/cards/CardStateroom';
import Layout from '../../layouts/Layout1';
import { DetailType } from '../../components/DetailInfo';
import Header from '../../assets/Header';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { getAccommodationsLoad } from '../../axios/roomApi';
import { AxiosError } from 'axios';
import { useAccommodationsStore } from '../../stores/useAccommodationsStore';
import useTimeFormet from '../../customHooks/useTimeFormet';

export default function Accommodations() {
  const navigate = useNavigate();
  const texts = ['주차가능', '조식운영'];
  const { accommodationId } = useParams();
  const { accommodation, actions } = useAccommodationsStore();
  useEffect(() => {
    actions.setAccommodationId(Number(accommodationId));
  }, [accommodationId]);
  useEffect(() => {
    const fetchGetLoad = async () => {
      try {
        const loadCard = await getAccommodationsLoad(Number(accommodationId));
        actions.setAccommodationsInfo(loadCard);
        if (
          loadCard.rooms.length === 1 &&
          loadCard.rooms[0].accommodation_name === loadCard.rooms[0].name
        ) {
          navigate(
            `/accommodations/stateroom/${accommodationId}/${loadCard.rooms[0].id}`
          );
        }
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
            title={accommodation.accommodation_info.name}
            price={accommodation.min_price}
            detailType={DetailType.Accommodations}
          />
        </Layout>
        <Divider />
        <Layout>
          {Array.isArray(accommodation?.rooms) &&
            accommodation?.rooms.map((room, idx) => {
              return (
                <CardStateroom
                  key={idx}
                  id={room?.id}
                  image={room?.images}
                  title={room?.name}
                  checkIn={useTimeFormet(room?.check_in_time)}
                  checkOut={useTimeFormet(room?.check_out_time)}
                  price={room?.price}
                  stayType={true}
                  capacity={room?.capacity}
                />
              );
            })}
        </Layout>
        <Divider />
        <Layout>
          <InfoTemp1
            title="숙소소개"
            text={accommodation.accommodation_info.description}
          />
          <InfoTemp2
            title="시설/서비스"
            texts={accommodation.accommodation_amenity}
          />
          <InfoTemp1
            title="이용안내"
            text={accommodation.accommodation_info.rules}
          />
          <div className="mb-12">
            <h6 className="mb-4 text-gray-500">환불정책</h6>
            <ul className="mb-4 text-black text-gray-500">
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
