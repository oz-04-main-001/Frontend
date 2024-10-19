import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Toolbar from './Toolbar';

const events = [
  {
    title: '120',
    start: new Date(2024, 9, 20, 10, 0), // 날짜와 시간은 Date 객체로 지정
    end: new Date(2024, 9, 20, 12, 0),
  },
];

const HostCalendar = () => {
  moment.locale('ko-KR');
  const localizer = momentLocalizer(moment);

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
        }}
      />
    </div>
  );
};

export default HostCalendar;
