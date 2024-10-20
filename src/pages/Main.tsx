import Header from '../assets/Header';
import MainCard from '../components/cards/CardMain';
import Search from '../components/Search';

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

  return (
    <div className="bg-gray-50">
      {/* 헤더 */}
      <Header 
    labels={[{ title: "마이페이지", link: "/mypage" }]} 
    color="white" 
/>

      {/* 검색 컴포넌트 */}
      <Search />

      {/* 도시 이름을 보여주는 이동하는 부분 */}
      <div className="flex items-center justify-between mt-4">
        <button className="bg-gray-300 rounded-full p-2 text-lg">&lt;</button>
        <div className="flex overflow-hidden whitespace-nowrap">
          <div
            className="flex transition-transform duration-500"
          >
            {/* 도시 이름을 두 번 반복하여 부드럽게 이동하도록 설정 */}
            {cities.concat(cities).map((city, index) => (
              <div key={index} className="px-4">{city}</div>
            ))}
          </div>
        </div>
        <button className="bg-gray-300 rounded-full p-2 text-lg">&gt;</button>
      </div>

      {/* 일자 선 */}
      <hr className="my-4 border-gray-300" />

      {/* 메인 카드들 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        <MainCard />
        {/* 필요한 만큼 MainCard 컴포넌트를 추가할 수 있습니다. */}
      </div>
    </div>
  );
};

export default Main;
