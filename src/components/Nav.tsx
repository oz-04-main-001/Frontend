import React from 'react';

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

interface NavProps {
  onCityClick: (city: string) => void;
  selectedCity: string | null;
}

const Nav: React.FC<NavProps> = ({ onCityClick, selectedCity }) => {
  return (
    <div className="flex items-center justify-between mt-4">
      <button className="bg-white rounded-full p-2 text-lg">&lt;</button>
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="flex">
          {cities.concat(cities).map((city, index) => (
            <div
              key={index}
              className={`px-6 py-3 cursor-pointer rounded-full transition duration-300 ${selectedCity === city ? 'bg-black text-white' : ' text-gray-800'}`} 
              onClick={() => onCityClick(city)} // 클릭 시 도시 전송
            >
              {city}
            </div>
          ))}
        </div>
      </div>
      <button className="bg-white rounded-full p-2 text-lg">&gt;</button>
    </div>
  );
};

export default Nav;
