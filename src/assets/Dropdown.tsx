import React, { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dropdown from '../assets/Dropdown'; 

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
  const [selectedDestination, setSelectedDestination] = useState<string>('여행지 선택');

  const destinations = [
    '선택해주세요', '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
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

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('체크인 및 체크아웃 날짜를 선택하세요.');
      return;
    }
    if (checkOut < checkIn) {
      alert('체크아웃 날짜는 체크인 날짜 이후여야 합니다.');
      return;
    }

    console.log('검색 시작:', {
      destination: selectedDestination,
      checkIn,
      checkOut,
      adults,
      children,
    });
  };

  const handleReset = () => {
    setCheckIn(null);
    setCheckOut(null);
    setAdults(1);
    setChildren(0);
    setActiveDropdown(null);
    setSelectedDestination('여행지 선택');
  };

  return (
    <div className="h-[100px] p-4 rounded-lg shadow-md max-w-[750px] mx-auto flex justify-center items-center border border-gray-300 bg-white">
      {/* 여행지 선택 */}
      <Dropdown
        width="140px"
        menuItems={destinations}
        onSelect={(item) => {
          setSelectedDestination(item);
          setActiveDropdown(null);
        }}
      />

      {/* 체크인 날짜 선택 */}
      <div className="relative mx-2">
        <button
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'checkIn' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(activeDropdown === 'checkIn' ? null : 'checkIn');
          }}
        >
          {checkIn ? format(checkIn, 'yyyy년 MM월 dd일') : '체크인'}
        </button>
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
              views={['month']} // 월별 보기만 활성화
            />
          </div>
        )}
      </div>

      {/* 체크아웃 날짜 선택 */}
      <div className="relative mx-2">
        <button
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'checkOut' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(activeDropdown === 'checkOut' ? null : 'checkOut');
          }}
        >
          {checkOut ? format(checkOut, 'yyyy년 MM월 dd일') : '체크아웃'}
        </button>
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
              views={['month']} // 월별 보기만 활성화
            />
          </div>
        )}
      </div>

      {/* 여행자 선택 */}
      <div className="relative mx-2">
        <button
          className={`block text-lg font-semibold cursor-pointer ${activeDropdown === 'traveler' ? 'bg-gray-300' : 'bg-white'} p-2 rounded-full transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(activeDropdown === 'traveler' ? null : 'traveler');
          }}
        >
          여행자
        </button>
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
              onClick={() => setActiveDropdown(null)}
              className="text-white bg-blue-500 px-6 py-2 rounded-md hover:bg-blue-600 transition"
            >
              설정 완료
            </button>
          </div>
        )}
        <span
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'traveler' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
        >
          {adults}명 성인, {children}명 아동
        </span>
      </div>

      {/* 검색 버튼 */}
      <button
        onClick={handleSearch}
        className="bg-green-500 text-black flex items-center px-6 py-2 rounded-md hover:bg-green-600 transition"
      >
        <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15.5 14H14.71L14.43 13.73C15.444 12.5541 16.0012 11.0527 16 9.5C16 8.21442 15.6188 6.95772 14.9046 5.8888C14.1903 4.81988 13.1752 3.98676 11.9874 3.49479C10.7997 3.00282 9.49279 2.87409 8.23192 3.1249C6.97104 3.3757 5.81285 3.99477 4.90381 4.90381C3.99477 5.81285 3.3757 6.97104 3.1249 8.23192C2.87409 9.49279 3.00282 10.7997 3.49479 11.9874C3.98676 13.1752 4.81988 14.1903 5.8888 14.9046C6.95772 15.6188 8.21442 16 9.5 16C11.0527 16.0012 12.5541 15.444 13.73 14.43L14 14.71V15.5L18 19.5L19.5 18L15.5 14ZM9.5 14C7.01472 14 5 11.9853 5 9.5C5 7.01472 7.01472 5 9.5 5C11.9853 5 14 7.01472 14 9.5C14 11.9853 11.9853 14 9.5 14Z" fill="currentColor"/>
        </svg>
        <span className="ml-2 font-bold">검색</span>
      </button>
    </div>
  );
};

export default Search;
