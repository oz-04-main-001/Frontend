import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  ko: ko,
};

const Search = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] = useState<string>(''); // 선택된 여행지 상태

  const destinations = [
    '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
    '대전광역시', '울산광역시', '세종특별자치시', '경기도', '충청북도',
    '충청남도', '전라남도', '경상북도', '강원도특별자치도', '전북특별자치도'
  ];

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleSelectSlot = ({ start }: { start: Date }) => {
    setCheckIn(start);
    setActiveDropdown(null);
  };

  const handleCheckOutSelect = ({ start }: { start: Date }) => {
    setCheckOut(start);
    setActiveDropdown(null);
  };

  const handleDestinationChange = (destination: string) => {
    setSelectedDestination(destination);
    setActiveDropdown(null);
  };

  return (
    <div className="h-[100px] p-4 bg-white rounded-lg shadow-md max-w-[750px] mx-auto flex justify-center items-center border border-gray-300" style={{ borderRadius: '50px' }}>
      {/* 여행지 선택 */}
      <div className="relative mx-2">
        <label 
          htmlFor="destination" 
          className="block text-lg font-semibold cursor-pointer"
          onClick={() => {
            setActiveDropdown(activeDropdown === 'destination' ? null : 'destination');
          }}
        >
          {selectedDestination || '여행지 선택'} {/* 선택된 도시 이름 또는 기본 텍스트 */}
        </label>
        {activeDropdown === 'destination' && (
          <select
            id="destination"
            value={selectedDestination} // 선택된 여행지 표시
            onChange={(e) => handleDestinationChange(e.target.value)} // 여행지 선택 시 처리
            className="border-10 border-gray-300 p-3 rounded-md w-[140px] focus:outline-none focus:ring focus:ring-primary-300"
          >
            {destinations.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        )}
      </div>

      {/* 체크인 날짜 선택 */}
      <div className="relative mx-2">
        <span 
          className={`p-2 rounded-md w-[140px] text-left cursor-pointer font-bold transition duration-200 ease-in-out ${activeDropdown === 'checkIn' ? 'shadow-lg' : ''}`} // 클릭 시 그림자 추가
          onClick={() => setActiveDropdown(activeDropdown === 'checkIn' ? null : 'checkIn')}
        >
          {checkIn ? format(checkIn, 'yyyy년 MM월 dd일') : '체크인'}
        </span>
        {activeDropdown === 'checkIn' && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleSelectSlot}
              style={{ height: 400 }}
            />
          </div>
        )}
      </div>

      {/* 체크아웃 날짜 선택 */}
      <div className="relative mx-2">
        <span 
          className={`p-2 rounded-md w-[140px] text-left cursor-pointer font-bold transition duration-200 ease-in-out ${activeDropdown === 'checkOut' ? 'shadow-lg' : ''}`} // 클릭 시 그림자 추가
          onClick={() => setActiveDropdown(activeDropdown === 'checkOut' ? null : 'checkOut')}
        >
          {checkOut ? format(checkOut, 'yyyy년 MM월 dd일') : '체크아웃'}
        </span>
        {activeDropdown === 'checkOut' && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md">
            <Calendar
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              selectable
              onSelectSlot={handleCheckOutSelect}
              style={{ height: 400 }}
            />
          </div>
        )}
      </div>

      {/* 여행자 선택 */}
      <div className="relative mx-2">
        <label 
          className="block text-lg font-semibold cursor-pointer"
          onClick={() => setActiveDropdown(activeDropdown === 'traveler' ? null : 'traveler')}
        >
          여행자
        </label>
        <span 
          onClick={() => setActiveDropdown(activeDropdown === 'traveler' ? null : 'traveler')}
          className={`p-2 rounded-md w-[140px] text-left cursor-pointer font-bold transition duration-200 ease-in-out ${activeDropdown === 'traveler' ? 'shadow-lg' : ''}`} // 클릭 시 그림자 추가
        >
          {adults}명 성인, {children}명 유아
        </span>
        {activeDropdown === 'traveler' && (
          <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md p-2">
            <div className="flex items-center mb-2">
              <label className="mr-2">성인</label>
              <button 
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="border border-gray-300 px-2 py-1 rounded-l-md"
              >
                -
              </button>
              <span className="border border-gray-300 px-4 py-1">{adults}</span>
              <button 
                onClick={() => setAdults(adults + 1)}
                className="border border-gray-300 px-2 py-1 rounded-r-md"
              >
                +
              </button>
            </div>
            <div className="flex items-center mb-2">
              <label className="mr-2">유아</label>
              <button 
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="border border-gray-300 px-2 py-1 rounded-l-md"
              >
                -
              </button>
              <span className="border border-gray-300 px-4 py-1">{children}</span>
              <button 
                onClick={() => setChildren(children + 1)}
                className="border border-gray-300 px-2 py-1 rounded-r-md"
              >
                +
              </button>
            </div>
          </div>
        )}
        <button className="text-white px-6 py-2 rounded-md hover:bg-primary-300 transition">
          🔍 검색
        </button>
      </div>
    </div>
  );
};

export default Search;
