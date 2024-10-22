import { useEffect, useState } from 'react';
import Header from '../../assets/Header';
import CardAccommodations from '../../components/cards/CardAccommodations';
import Filter from '../../components/Filter';
import Search from '../../components/Search';
import Layout2 from '../../layouts/Layout2';
import Map from './Map';
import { getLoad } from '../../axios/accommodationApi';

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

export default function index() {
  const [accommodationInfo, setAccommodationInfo] =
    useState<FetchAccommodationInfo[]>();
  useEffect(() => {
    const fetchGetLoad = async () => {
      const loadCard = await getLoad(1);
      setAccommodationInfo(loadCard);
    };
    fetchGetLoad();
  }, []);
  const headerLabels = [{ title: '마이페이지', link: '/mypage' }];
  return (
    <>
      <Header labels={headerLabels} />
      <Search />
      <Filter />
      <Layout2>
        <div className="grid grid-cols-2 gap-6 mt-20 mb-14">
          <div className="grid grid-cols-3 gap-8"></div>
          <div className="sticky h-screen overflow-hidden bg-gray-200 border-2 border-solid rounded-md border-gray-50 top-14">
            <Map />
          </div>
        </div>
      </Layout2>
    </>
  );
}
