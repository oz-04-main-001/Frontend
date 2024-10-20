import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './custom-calendar.css';
import Toolbar from './Toolbar';

// 이벤트 인터페이스 정의
interface Event {
  title: string;
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

// 더미 데이터 생성 함수
const generateDummyData = (): Record<string, number> => {
  const startDate = new Date(2024, 9, 1);
  const endDate = new Date(2024, 9, 31);
  const reservationCounts: Record<string, number> = {};

  for (let d = startDate; d <= endDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]; // 날짜를 문자열로 변환
    reservationCounts[dateStr] = Math.floor(Math.random() * 111); // 예약 건수 생성
  }

  return reservationCounts;
};

// 커스텀 이벤트 컴포넌트
const CustomEvent = ({ event }: { event: Event }) => (
  <div className="flex justify-center items-center h-full">
    <div className="bg-primary-600 bg-opacity-30 text-black rounded-full w-10 h-10 flex items-center justify-center">
      {event.title} {/* 이벤트 타이틀 표시 */}
    </div>
  </div>
);

const HostCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEventDate, setSelectedEventDate] = useState<string | null>(
    null
  );

  // 컴포넌트가 마운트될 때 더미 데이터를 생성하여 상태에 저장
  useEffect(() => {
    const reservationCounts = generateDummyData();
    const newEvents: Event[] = Object.entries(reservationCounts).map(
      ([date, count]) => ({
        title: `${count}`, // 이벤트 타이틀 설정
        start: new Date(date), // 시작 날짜 설정
        end: new Date(date), // 종료 날짜 설정
        allDay: true,
      })
    );
    setEvents(newEvents); // 이벤트 상태 업데이트
  }, []);

  // 이벤트 클릭 시 호출되는 함수
  const handleSelectEvent = (event: Event) => {
    const dateStr = moment(event.start).format('YYYY-MM-DD'); // 날짜 형식 변환
    setSelectedEventDate(prev => (prev === dateStr ? null : dateStr)); // 선택된 날짜 업데이트
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        defaultView="month"
        views={['month']}
        components={{
          toolbar: Toolbar,
          event: CustomEvent,
        }}
        onSelectEvent={handleSelectEvent} // 이벤트 클릭 시 호출할 함수
        dayPropGetter={date => {
          const dateStr = moment(date).format('YYYY-MM-DD');
          return {
            className:
              selectedEventDate === dateStr
                ? 'bg-gray-100' // 선택된 타일의 배경색 변경
                : '',
            style: { borderColor: 'transparent' }, // 테두리 제거 스타일 적용
          };
        }}
        onNavigate={_date => {
          // 달력을 이동할 때 선택된 날짜 초기화
          setSelectedEventDate(null);
        }}
      />
    </div>
  );
};

export default HostCalendar;
