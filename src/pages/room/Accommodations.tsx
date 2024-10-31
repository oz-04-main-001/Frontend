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
import { useSearchStore } from '../../stores/useSearchStore';
import useDateDashFormet from '../../customHooks/useDateDashFormet';

export default function Accommodations() {
  const navigate = useNavigate();
  const { accommodationId } = useParams();
  const { data, actions } = useAccommodationsStore();
  const { search } = useSearchStore();
  const checkInDate = search.date.checkIn
    ? useDateDashFormet(search.date.checkIn)
    : '';
  const checkOutDate = search.date.checkOut
    ? useDateDashFormet(search.date.checkOut)
    : '';

  useEffect(() => {
    const fetchGetLoad = async () => {
      if (!accommodationId) return;
      if (!checkInDate) return;
      try {
        const loadCard = await getAccommodationsLoad(
          accommodationId,
          checkInDate,
          checkOutDate,
          search.personnel.adult
        );

        if (loadCard) {
          actions.setAccommodationsInfo(Number(accommodationId), loadCard);
          if (
            loadCard.accommodation.accommodation_type.type_name.includes('독채')
          ) {
            navigate(
              `/accommodations/stateroom/${accommodationId}/${loadCard.available_rooms[0].id}`
            );
          }
        } else {
          console.error('No data returned for accommodations');
        }
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const statusCode = axiosError.response.status;
          switch (statusCode) {
            case 401:
              navigate('/user/login');
              break;
            default:
              console.log('요청 에러');
              break;
          }
        }
      }
    };

    fetchGetLoad();
  }, [accommodationId, search, checkInDate]);
  console.log();
  return (
    <>
      <Header />
      <Layout>
        <DetailInfo
          subTitle={data.accommodation.address || '주소 정보가 없습니다.'}
          title={
            data.accommodation.accommodation_info?.name ||
            '숙소 이름이 없습니다.'
          }
          price={data.accommodation.min_price ?? 0}
          detailType={DetailType.Accommodations}
        />
      </Layout>
      <Divider />
      <Layout>
        {Array.isArray(data.available_rooms) &&
          data.available_rooms.map((room, idx) => {
            return (
              <CardStateroom
                key={idx}
                id={room.id}
                image={room.representative_image}
                title={room.name || '객실 이름이 없습니다.'}
                checkIn={useTimeFormet(room.check_in_time || '')}
                checkOut={useTimeFormet(room.check_out_time || '')}
                price={room.price ?? 0}
                stayType={true}
                capacity={room.capacity ?? 0}
              />
            );
          })}
      </Layout>
      <Divider />
      <Layout>
        <InfoTemp1
          title="숙소소개"
          text={
            data.accommodation.accommodation_info?.description ||
            '설명이 없습니다.'
          }
        />
        <InfoTemp2
          title="시설/서비스"
          texts={data.accommodation.accommodation_amenity || []}
        />
        <InfoTemp1
          title="이용안내"
          text={
            data.accommodation.accommodation_info?.rules ||
            '이용 안내가 없습니다.'
          }
        />
        <div className="mb-12">
          <h6 className="mb-4 text-gray-500">환불정책</h6>
          <ul className="mb-4 text-gray-500">
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
