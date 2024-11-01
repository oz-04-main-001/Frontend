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
import { useSearchRoomStore } from '../stores/useSearchRoomStore';
import useDateDashFormet from '../customHooks/useDateDashFormet';
import { getSearchLoad } from '../axios/searchApi';
import { AxiosError } from 'axios';

const locales = {
  ko: ko,
};

interface SearchProp {
  border?: boolean;
}

const Search = ({ border = true }: SearchProp) => {
  const navigate = useNavigate();
  const { search, actions: searchActions } = useSearchStore();
  const { actions: roomActions } = useSearchRoomStore();
  const [selectedCity, setSelectedCity] = useState<string | null>(search.city);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const checkInDate = search.date.checkIn
    ? useDateDashFormet(search.date.checkIn)
    : '';
  const checkOutDate = search.date.checkOut
    ? useDateDashFormet(search.date.checkOut)
    : '';

  const fetchGetLoad = async () => {
    if (checkInDate && checkOutDate) {
      try {
        const loadCard = await getSearchLoad(
          search.city,
          checkInDate,
          checkOutDate,
          search.personnel.adult
        );
        roomActions.setSearchData(loadCard);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const statusCode = axiosError.response.status;
          switch (statusCode) {
            case 401:
              navigate('/user/login');
              break;
            default:
              console.log('요청 에러');
              break;
          }
        } else {
          console.error('Network or other error:', axiosError);
        }
      }
    }
  };

  const handleCityClick = (item: string | null) => {
    if (item) {
      setSelectedCity(item);
      searchActions.setCity(item);
    }
  };

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
    '전라북도',
    '전라남도',
    '경상북도',
    '강원도',
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
    searchActions.setCheckIn(start);
    setCheckIn(start);
    setActiveDropdown(null);
  };

  const handleCheckOutSelect = ({ end }: { end: Date }) => {
    searchActions.setCheckOut(end);
    setCheckOut(end);
    setActiveDropdown(null);
  };

  const handleSearch = () => {
    const parsedCheckIn = parse(checkInDate, 'yyyy-MM-dd', new Date());
    const parsedCheckOut = parse(checkOutDate, 'yyyy-MM-dd', new Date());
    if (isBefore(parsedCheckOut, parsedCheckIn)) {
      alert('체크아웃 날짜는 체크인 날짜 이후여야 합니다.');
      return;
    }
    if (search.city === '여행지') {
      alert('여행지를 선택해주세요.');
      return;
    }
    fetchGetLoad();
    navigate('/search');
  };

  return (
    <div
      className={`s1 rounded-full h-24 p-4 max-w-[750px] mx-auto flex justify-center items-center ${border ? 'border border-gray-300 ' : ''}  bg-white`}
    >
      <Dropdown
        menuItems={destinations}
        title={search.city}
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
                ? format(checkIn, 'yyyy.MM.dd')
                : search.date.checkIn
              : checkOut
                ? format(checkOut, 'yyyy.MM.dd')
                : search.date.checkOut}
          </button>
          {activeDropdown === check && (
            <div className="absolute z-10 bg-white border border-gray-300 rounded-md shadow-md">
              <Calendar
                localizer={localizer}
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
            : '혼자'}
        </button>
        {activeDropdown === 'traveler' && (
          <div className="absolute p-2 text-gray-700 bg-white rounded-md -bottom-35 min-w-40 ring-1 ring-black ring-opacity-5 btn1">
            <div className="flex items-center justify-between mb-2">
              <p className="mr-2">성인</p>
              <div className="flex content-center justify-between">
                <button
                  type="button"
                  onClick={() => searchActions.setAdultDecrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <MinusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
                <p className="px-2 pt-1 s1">{search.personnel.adult}</p>
                <button
                  onClick={() => searchActions.setAdultIncrease()}
                  className="p-1 border border-gray-100 rounded-md aspect-square"
                >
                  <PlusIcon width="24" height="24" fill="#BDBDBD" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <button
        type="button"
        className="flex items-center px-4 py-2 mr-2 text-black transition bg-green-500 rounded-md hover:bg-green-600"
        onClick={handleSearch}
        style={{ zIndex: 10, position: 'relative' }}
      >
        <SearchIcon width="24" height="24" fill="black" />
      </button>
    </div>
  );
};

export default Search;
