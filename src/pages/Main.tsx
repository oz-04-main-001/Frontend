import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';
import Filter from '../components/Filter';

import { getLoad } from '../axios/mainApi';
import { useNavigate } from 'react-router-dom';
import Layout from '../layouts/Layout2';

interface FetchCardInfo {
  name: string;
  rooms: number;
  hotel_img: string | null;
}

const Main: React.FC = () => {
  const navigate = useNavigate();
  const [cardList, setCardList] = useState<FetchCardInfo[]>();

  const handleAccommodationPage = () => {
    navigate(`/accommodations`);
  };
  useEffect(() => {
    const fetchGetLoad = async () => {
      const loadCard = await getLoad();
      setCardList(loadCard);
    };
    fetchGetLoad();
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

      <Filter />

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
