import React, { useState } from 'react';
import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';
import Nav from '../components/Nav'; 

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

  const handleCityClick = (city: string) => {
    setSelectedCity(city);
    // 클릭된 도시로 필터링
    setFilteredCities(cities.filter((c) => c === city));
  };

  return (
    <div className="bg-gray-50">
      {/* 헤더 */}
      <Header 
        labels={[{ title: "마이페이지", link: "/mypage" }]} 
        color="white" 
      />

      {/* 검색 컴포넌트 */}
      <Search />

      {/* Nav 컴포넌트 추가 */}
      <Nav onCityClick={handleCityClick} selectedCity={selectedCity} />

      {/* 일자 선 */}
      <hr className="my-4 border-gray-300" />

      {/* 선택된 도시의 필터링된 메인 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCities.map((city, index) => (
          <MainCard key={index} city={city} />
        ))}
      </div>

      {/* 지도 컴포넌트 (지도 라이브러리 사용) */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-2">지도 보기</h2>
        {/* 여기에 지도 라이브러리를 사용하여 지도를 표시할 수 있습니다. */}
        <div className="h-64 bg-gray-200 rounded-lg">
          {/* 예시: <MapComponent city={selectedCity} /> */}
          {/* MapComponent를 실제 지도 컴포넌트로 대체하세요. */}
        </div>
      </div>
    </div>
  );
};

export default Main;
