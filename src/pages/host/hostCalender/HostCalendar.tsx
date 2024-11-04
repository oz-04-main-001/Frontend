import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import './custom-calendar.css';
import Toolbar from './Toolbar';
import useSelectedDateStore from '../../../stores/useSelectedDateStore';
import HostTotalManagementAmountAPI from '../../../axios/HostTotalManagementAmountAPI';

// 이벤트 인터페이스 정의
interface Event {
  title: string;
  start: Date;
  end: Date;
}

const localizer = momentLocalizer(moment);

const CustomEvent = ({ event }: { event: Event }) => (
  <div className="flex justify-center items-center h-full">
    <div className="bg-primary-600 bg-opacity-30 text-black rounded-full w-10 h-10 flex items-center justify-center">
      {event.title} 
    </div>
  </div>
);

const HostCalendar = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const { selectedDate, setSelectedDate } = useSelectedDateStore();
  const [currentMonth, setCurrentMonth] = useState<number | null>(
    new Date().getMonth() + 1
  );
  const amountData = HostTotalManagementAmountAPI({
    currentMonth,
  });

  useEffect(() => {
    if (amountData) {
      const newEvents: Event[] = amountData.map(data => ({
        title: `${data.total_bookings}`,
        start: new Date(data.date),
        end: new Date(data.date),
        allday: true,
      }));
      setEvents(newEvents);
    }
  }, [amountData]);

  // 이벤트 클릭 시 호출
  const handleSelectEvent = (event: Event) => {
    const dateStr = moment(event.start).format('YYYY-MM-DD');
    setSelectedDate(selectedDate === dateStr ? null : dateStr);
  };
  // console.log('selectedDate', selectedDate);

  return (
    <div className="-z-50">
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 520 }}
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
              selectedDate === dateStr
                ? 'bg-gray-100' // 선택된 타일의 배경색 변경
                : '',
          };
        }}
        onNavigate={date => {
          // 달력을 이동할 때 선택된 날짜 초기화
          setCurrentMonth(date.getMonth() + 1);
          setSelectedDate(null);
        }}
      />
    </div>
  );
};

export default HostCalendar;
