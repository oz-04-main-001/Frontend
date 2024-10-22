import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';
import Filter from '../components/Filter';

import { getLoad } from '../axios/mainApi';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout2';

interface FecthCardInfo {
  name: string;
  rooms: number;
  hotel_img: string | null;
}

const cities = [
  '서울특별시',
  '부산광역시',
  '대구광역시',
  '인천광역시',
  '광주광역시',
  '대전광역시',
  '울산광역시',
  '세종특별자치시',
  '경기도',
  '충청북도',
  '충청남도',
  '전라남도',
  '경상북도',
  '강원도특별자치도',
  '전북특별자치도',
];

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<FecthCardInfo[]>();

  const handleAccommodationPage = () => {
    navigate(`/accommodations`);
  };
  useEffect(() => {
    const test = async () => {
      const loadCard = await getLoad();
      card = loadCard;
      console.log('card', card);
    };
    test();
  }, []);

  return (
    <div>
      <Header
        labels={[{ title: '마이페이지', link: '/mypage' }]}
        color="white"
        border={false}
      />
      <div className="mt-16">
        <Search />
      </div>

      <Filter list={cities} />

      <Layout>
        <div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
          onClick={handleAccommodationPage}
        >
          {cardList?.map((card, index) => (
            <MainCard
              key={index}
              title={card.name}
              price={card.rooms}
              image={card.hotel_img}
            />
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default Main;
