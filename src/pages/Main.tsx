import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';
import Filter from '../components/Filter';

import { getLoad } from '../axios/mainApi';
import Layout from '../layouts/Layout2';

interface FetchCardInfo {
  id: number;
  name: string;
  rooms: number;
  hotel_img: string;
  min_price: string;
}

const Main: React.FC = () => {
  const [cardList, setCardList] = useState<FetchCardInfo[]>();

  useEffect(() => {
    const fetchGetLoad = async () => {
      const loadCard = await getLoad();
      setCardList(loadCard);
    };
    fetchGetLoad();
  }, []);

  return (
    <div>
      <Header border={false} />
      <div className="mt-16">
        <Search />
      </div>

      <Filter />

      <Layout>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {cardList?.map(card => {
            return (
              <MainCard
                key={card.id}
                id={card.id}
                title={card.name}
                price={card.min_price}
                image={card.hotel_img}
              />
            );
          })}
        </div>
      </Layout>
    </div>
  );
};

export default Main;
