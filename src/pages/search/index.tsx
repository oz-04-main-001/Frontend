import { useEffect, useState } from 'react';
import Header from '../../assets/Header';
import CardAccommodations from '../../components/cards/CardAccommodations';
import Filter from '../../components/Filter';
import Search from '../../components/Search';
import Layout2 from '../../layouts/Layout2';
import Map from './Map';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { getSearchLoad } from '../../axios/searchApi';
import { useSearchStore } from '../../stores/useSearchStore';
import useDateDashFormet from '../../customHooks/useDateDashFormet';

interface FetchAccommodationInfo {
  id: string;
  location: string[];
  lowest_price: string;
  name: string;
  representative_image: string;
  room: number[];
}

export default function Index() {
  const navigate = useNavigate();
  const [accommodationInfo, setAccommodationInfo] = useState<
    FetchAccommodationInfo[]
  >([]);
  const { search } = useSearchStore();

  const checkInDate = search.date.checkIn
    ? useDateDashFormet(search.date.checkIn)
    : '';
  const checkOutDate = search.date.checkOut
    ? useDateDashFormet(search.date.checkOut)
    : '';

  useEffect(() => {
    const fetchGetLoad = async () => {
      if (checkInDate && checkOutDate) {
        try {
          const loadCard = await getSearchLoad(
            checkInDate,
            checkOutDate,
            search.personnel.adult,
            search.city
          );
          setAccommodationInfo(loadCard);
          console.log('loadCard', loadCard);
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
      }
    };
    fetchGetLoad();
  }, [search, checkInDate, checkOutDate]);

  console.log('accommodationInfo', accommodationInfo);

  return (
    <>
      <Header />
      <Search />
      <Filter />
      <Layout2>
        <div className="grid grid-cols-2 gap-6 mt-20 mb-14">
          <div className="grid grid-cols-3 gap-8">
            {accommodationInfo.length > 0
              ? accommodationInfo.map((info, index) => (
                  <CardAccommodations
                    key={index}
                    id={info.id}
                    location={info.location}
                    accommodationsName={info.name}
                    lowestPrice={info.lowest_price}
                    representativeImage={info.representative_image}
                    room={info.room}
                  />
                ))
              : '검색 리스트를 불러오고 있습니다.'}
          </div>
          <div className="sticky h-screen overflow-hidden bg-gray-200 border-2 border-solid rounded-md border-gray-50 top-14">
            <Map />
          </div>
        </div>
      </Layout2>
    </>
  );
}
