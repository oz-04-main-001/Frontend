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
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const [destination, setDestination] = useState('');
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  const destinations = [
    '서울특별시', '부산광역시', '대구광역시', '인천광역시', '광주광역시',
    '대전광역시', '울산광역시', '세종특별자치시', '경기도', '충청북도',
    '충청남도', '전라남도', '경상북도', '강원도특별자치도', '전북특별자치도', '제주특별자치도'
  ];

  const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
  });

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    const newEvent = {
      start,
      end,
      title: `${destination} 체크인 및 체크아웃`,
    };
    setEvents((prev) => [...prev, newEvent]);
    setSelectedEvent(newEvent);
  };

  return (
    <div className="p-8 bg-white rounded-lg shadow-md max-w-2xl mx-auto">
      {/* 여행지 선택 */}
      <div className="mb-6">
        <label htmlFor="destination" className="block text-lg font-semibold mb-2">여행지 선택</label>
        <select
          id="destination"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="border border-gray-300 p-3 rounded-md w-full focus:outline-none focus:ring focus:ring-primary-300"
        >
          <option value="" disabled>여행지를 선택하세요</option>
          {destinations.map((city) => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      {/* 여행자 선택 */}
      <div className="mb-6">
        <label className="block text-lg font-semibold mb-2">여행자</label>
        <div className="flex space-x-4">
          <div className="flex items-center">
            <label className="mr-2">성인</label>
            <input
              type="number"
              value={adults}
              onChange={(e) => setAdults(Math.max(1, parseInt(e.target.value)))}
              className="border border-gray-300 p-2 rounded-md w-20 focus:outline-none focus:ring focus:ring-primary-300"
              min={1}
            />
          </div>
          <div className="flex items-center">
            <label className="mr-2">유아</label>
            <input
              type="number"
              value={children}
              onChange={(e) => setChildren(Math.max(0, parseInt(e.target.value)))}
              className="border border-gray-300 p-2 rounded-md w-20 focus:outline-none focus:ring focus:ring-primary-300"
              min={0}
            />
          </div>
        </div>
      </div>

      {/* 달력 */}
      <div className="mb-6">
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

      {/* 선택된 이벤트 정보 */}
      {selectedEvent && (
        <div className="mb-6">
          <h3 className="font-bold text-lg">선택된 날짜</h3>
          <p>체크인: {selectedEvent.start.toLocaleDateString()}</p>
          <p>체크아웃: {selectedEvent.end.toLocaleDateString()}</p>
        </div>
      )}

      {/* 검색 버튼 */}
      <div className="flex justify-end">
        <button className="bg-primary-600 text-white px-6 py-2 rounded-md hover:bg-primary-300 transition">
          🔍 검색
        </button>
      </div>
    </div>
  );
};

export default Search;
