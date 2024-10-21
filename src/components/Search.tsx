import { useEffect, useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore } from 'date-fns';
import ko from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dropdown from '../assets/Dropdown';
import { useSearchStore } from '../stores/useSearchStore';

const locales = {
  ko: ko,
};

const Search = () => {
  const { search, actions } = useSearchStore();
  useEffect(() => {
    actions.setCity('Seoul');
  }, []);
  const [events, setEvents] = useState<any[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [selectedDestination, setSelectedDestination] =
    useState<string>('여행지 선택');

  const destinations = [
    '선택해주세요',
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

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('체크인 및 체크아웃 날짜를 선택하세요.');
      return;
    }
    if (isBefore(checkOut, checkIn)) {
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
    <div className="rounded-full h-24 p-4 max-w-[750px] mx-auto flex justify-center items-center border border-gray-300 bg-white">
      <div className="">
        <Dropdown menuItems={destinations} />
        {activeDropdown === 'destination' && (
          <select
            id="destination"
            onChange={e => handleDestinationChange(e.target.value)}
            className="border-10 border-gray-300 p-3 rounded-md w-[140px] focus:outline-none focus:ring focus:ring-primary-300"
          >
            {destinations.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        )}
      </div>

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
              views={['month']} // Limit to month view
              step={60} // Step can be set to any value, just to avoid time selection
              style={{ height: 400 }}
            />
          </div>
        )}
      </div>

      {/* 체크아웃 날짜 선택 */}
      <div className="relative mx-2">
        <button
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'checkOut' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(
              activeDropdown === 'checkOut' ? null : 'checkOut'
            );
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
              views={['month']} // Limit to month view
              step={60} // Step can be set to any value, just to avoid time selection
              style={{ height: 400 }}
            />
          </div>
        )}
      </div>

      {/* 여행자 선택 */}
      <div className="relative mx-2">
        <button
          className={`block text-lg font-semibold cursor-pointer ${activeDropdown === 'traveler' ? 'bg-gray-300' : 'bg-white'} p-2 rounded-full transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(
              activeDropdown === 'traveler' ? null : 'traveler'
            );
          }}
        >
          여행자
        </button>
        {activeDropdown === 'traveler' && (
          <div className="absolute z-10 p-2 bg-white border border-gray-300 rounded-md shadow-md">
            <div className="flex items-center mb-2">
              <label className="mr-2">성인</label>
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="px-2 py-1 border border-gray-300 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-1 border border-gray-300">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="px-2 py-1 border border-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
            <div className="flex items-center mb-2">
              <label className="mr-2">아동</label>
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="px-2 py-1 border border-gray-300 rounded-l-md"
              >
                -
              </button>
              <span className="px-4 py-1 border border-gray-300">
                {children}
              </span>
              <button
                onClick={() => setChildren(children + 1)}
                className="px-2 py-1 border border-gray-300 rounded-r-md"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setActiveDropdown(null)}
              className="px-6 py-2 text-white transition bg-blue-500 rounded-md hover:bg-blue-600"
            >
              설정 완료
            </button>
          </div>
        )}
        <span
          className={`rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'traveler' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
        >
          {`${adults} 성인 ${children} 아동`}
        </span>
      </div>

      {/* 검색 버튼 */}
      <div className="flex items-center mx-2">
        <button
          onClick={handleSearch}
          className="flex items-center px-4 py-2 mr-2 text-black transition bg-green-500 rounded-md hover:bg-green-600"
        >
          {/* Search Icon */}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mr-1"
          >
            <path
              d="M21 21L15.5 15.5M19 10C19 14.4183 15.4183 18 11 18C6.58172 18 3 14.4183 3 10C3 5.58172 6.58172 2 11 2C15.4183 2 19 5.58172 19 10Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Search;
