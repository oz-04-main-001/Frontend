import { useState } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay, isBefore } from 'date-fns';
import { ko } from 'date-fns/locale/ko';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Dropdown from '../assets/Dropdown';
import { useSearchStore } from '../stores/useSearchStore';
import PlusIcon from '../assets/icons/plus.svg?react';
import MinusIcon from '../assets/icons/minus.svg?react';
import SearchIcon from '../assets/icons/search.svg?react';
import { useNavigate } from 'react-router-dom';

const locales = {
  ko: ko,
};

const Search = () => {
  const navigate = useNavigate();
  const { search, actions } = useSearchStore();
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleCityClick = (item: string) => {
    actions.setCity(item);
  };
  const [events, setEvents] = useState<any[]>([]);
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);

  const destinations = [
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
  const checkTime = ['checkIn', 'checkOut'];
  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleCheckInSlot = ({ start }: { start: Date }) => {
    actions.setCheckIn(start);
    setCheckIn(start);
    setActiveDropdown(null);
  };

  const handleCheckOutSelect = ({ end }: { end: Date }) => {
    actions.setCheckOut(end);
    setCheckOut(end);
    setActiveDropdown(null);
  };

  const handleSearch = () => {
    if (!search.date.checkIn || !search.date.checkOut) {
      alert('체크인 및 체크아웃 날짜를 선택하세요.');
      return;
    }
    if (isBefore(search.date.checkOut, search.date.checkIn)) {
      alert('체크아웃 날짜는 체크인 날짜 이후여야 합니다.');
      return;
    }
    navigate('/search');
  };

  return (
    <div className="s1 rounded-full h-24 p-4 max-w-[750px] mx-auto flex justify-center items-center border border-gray-300 bg-white">
      <Dropdown
        menuItems={destinations}
        title="여행지 선택"
        style="s1 text-black"
        selectedItem={selectedCity}
        setSelectedItem={setSelectedCity}
        onClick={handleCityClick}
      />

      {checkTime.map(check => (
        <div className="relative mx-2" key={check}>
          <button
            className={`rounded-full w-[140px] text-center cursor-pointer s1 ${activeDropdown === check ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
            onClick={() => {
              setActiveDropdown(activeDropdown === check ? null : check);
            }}
          >
            {check === 'checkIn'
              ? checkIn
                ? format(checkIn, 'yy년 MM월 dd일')
                : '체크인'
              : checkOut
                ? format(checkOut, 'yy년 MM월 dd일')
                : '체크아웃'}
          </button>
          {activeDropdown === check && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                selectable
                onSelectSlot={
                  check === 'checkIn' ? handleCheckInSlot : handleCheckOutSelect
                }
                views={['month']}
                step={60}
                style={{ height: 400 }}
              />
            </div>
          )}
        </div>
      ))}

      <div className="relative mx-2">
        <button
          className={`block s1 cursor-pointer ${activeDropdown === 'traveler' ? 'bg-gray-300' : 'bg-white'} p-2 rounded-full transition-colors duration-200`}
          onClick={() => {
            setActiveDropdown(
              activeDropdown === 'traveler' ? null : 'traveler'
            );
          }}
        >
          {search.personnel.adult > 1
            ? `게스트 ${search.personnel.adult}`
            : '여행자'}
        </button>
        {activeDropdown === 'traveler' && (
          <div className="absolute p-2 text-gray-700 bg-white rounded-md -bottom-35 min-w-40 ring-1 ring-black ring-opacity-5 btn1">
            <div className="flex items-center justify-between mb-2">
              <p className="mr-2">성인</p>
              <div className="flex content-center justify-between">
                <button
                  type="button"
                  onClick={() => actions.setAdultDecrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <MinusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
                <p className="px-2 pt-1 s1">{search.personnel.adult}</p>
                <button
                  onClick={() => actions.setAdultIncrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <PlusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="mr-2">아동</p>
              <div className="flex content-center justify-between">
                <button
                  type="button"
                  onClick={() => actions.setInfantDecrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <MinusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
                <p className="px-2 pt-1 s1">{search.personnel.infant}</p>
                <button
                  onClick={() => actions.setInfantIncrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <PlusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
              </div>
            </div>
          </div>
        )}
        <span
          className={`hidden s1 rounded-full w-[140px] text-left cursor-pointer font-bold ${activeDropdown === 'traveler block' ? 'bg-gray-300' : 'bg-white'} p-2 transition-colors duration-200`}
        >
          {`게스트 ${search.personnel.adult}`}
        </span>
      </div>

      <button
        type="button"
        onClick={handleSearch}
        className="flex items-center px-4 py-2 mr-2 text-black transition bg-green-500 rounded-md hover:bg-green-600"
      >
        <SearchIcon width="24" height="24" fill="black" />
      </button>
    </div>
  );
};

export default Search;
