import { NavigateAction } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

interface ToolbarProps {
  date: Date;
  onNavigate: (action: NavigateAction, newDate?: Date) => void;
  label: string;
}

const Toolbar: React.FC<ToolbarProps> = props => {
  const { date, onNavigate } = props;

  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };

  const handleToday = () => {
    props.onNavigate('TODAY');
  };

  return (
    <div className="rbc-toolbar">
      <span className="rbc-btn-group">
        {/* <button type="button" onClick={navigate.bind(null, 'TODAY')}>
          이번달
        </button> */}
        <button type="button" onClick={navigate.bind(null, 'PREV')}>
          이전
        </button>
        <span
          className="rbc-toolbar-label"
          onClick={handleToday}
          style={{ cursor: 'pointer' }}
        >
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </span>
        <button type="button" onClick={navigate.bind(null, 'NEXT')}>
          다음
        </button>
      </span>
    </div>
  );
};

export default Toolbar;
