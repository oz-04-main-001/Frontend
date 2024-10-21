import React, { useEffect, useState } from 'react';
import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';
import Nav from '../components/Nav';

import { getLoad } from '../axios/mainApi';

// 도시 배열
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
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [filteredCities, setFilteredCities] = useState<string[]>(cities);
  let hello;
  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    // 클릭된 도시로 필터링
    setFilteredCities(cities.filter(c => c === city));
  };

  useEffect(() => {
    const test = async () => {
      const loadCard = await getLoad();
      hello = loadCard;
      console.log('hello', hello);
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

      {/* Nav 컴포넌트 추가 */}
      <Nav onCityClick={handleCityClick} selectedCity={selectedCity} />

      {/* 일자 선 */}
      <hr className="my-4 border-gray-300" />

      {/* 선택된 도시의 필터링된 메인 카드들 */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {filteredCities.map((city, index) => (
          <MainCard key={index} city={city} />
        ))}
      </div>
    </div>
  );
};

export default Main;
