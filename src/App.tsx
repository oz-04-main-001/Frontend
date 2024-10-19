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
  const [isActive, setIsActive] = useState(false);

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

  // 체크인 날짜 선택 핸들러
  const handleSelectSlot = ({ start }: { start: Date }) => {
    setCheckIn(start);
    setActiveDropdown(null);
    setIsActive(true);
  };

  // 체크아웃 날짜 선택 핸들러
  const handleCheckOutSelect = ({ start }: { start: Date }) => {
    setCheckOut(start);
    setActiveDropdown(null);
    setIsActive(true);
  };

  // 여행지 선택 핸들러
  const handleDestinationChange = (destination: string) => {
    setActiveDropdown(null);
    setIsActive(true);
  };

  return (
    <div
      className={`h-[100px] p-4 rounded-lg shadow-md max-w-[750px] mx-auto flex justify-center items-center border border-gray-300 ${
        isActive ? 'bg-white' : 'bg-gray-100'
      }`}
      style={{ borderRadius: '50px' }}
    >
      {/* 여행지 선택 */}
      <div className="relative mx-2">
        <label
          htmlFor="destination"
          className={`block text-lg font-semibold cursor-pointer ${activeDropdown === 'destination' ? 'p-10' : 'p-2'} rounded-full transition-colors duration-200 ${activeDropdown === 'destination' ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
          onClick={() => {
            setActiveDropdown(activeDropdown === 'destination' ? null : 'destination');
          }}
        >
          여행지 선택
        </label>
        {activeDropdown === 'destination' && (
          <select
            id="destination"
            onChange={(e) => handleDestinationChange(e.target.value)}
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
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold transition-colors duration-200 ${activeDropdown === 'checkIn' ? 'p-10' : 'p-2'} ${activeDropdown === 'checkIn' ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
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
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold transition-colors duration-200 ${activeDropdown === 'checkOut' ? 'p-10' : 'p-2'} ${activeDropdown === 'checkOut' ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
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
          className={`block text-lg font-semibold cursor-pointer ${activeDropdown === 'traveler' ? 'p-10' : 'p-2'} rounded-full transition-colors duration-200 ${activeDropdown === 'traveler' ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
          onClick={() => setActiveDropdown(activeDropdown === 'traveler' ? null : 'traveler')}
        >
          여행자
        </label>
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
              <label className="mr-2">아동</label>
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
            <button
              onClick={() => setActiveDropdown(null)} // 드롭다운 닫기
              className="text-white bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              설정 완료
            </button>
          </div>
        )}
        <span
          onClick={() => setActiveDropdown(activeDropdown === 'traveler' ? null : 'traveler')}
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold transition-colors duration-200 ${activeDropdown === 'traveler' ? 'p-10' : 'p-2'} ${activeDropdown === 'traveler' ? 'bg-white shadow-lg' : 'bg-gray-100'}`}
        >
          {adults}명 성인, {children}명 아동
        </span>
      </div>

      <button
        className="ml-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        onClick={() => {
          // 검색 버튼 클릭 시의 로직
        }}
      >
        🔍
      </button>
    </div>
  );
};

export default Search;