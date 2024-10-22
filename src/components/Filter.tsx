import { useRef, useState } from 'react';
import { useSearchStore } from '../stores/useSearchStore';

interface FilterProps {
  onCityClick?: (city: string) => void;
  list: string[];
}

const Filter: React.FC<FilterProps> = ({ list }) => {
  const { actions } = useSearchStore();
  const [active, setActive] = useState<number>();
  const scrollContainerRef = useRef<HTMLUListElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current!.offsetLeft);
    setScrollLeft(scrollContainerRef.current!.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current!.offsetLeft;
    const walk = (x - startX) * 2;
    scrollContainerRef.current!.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  return (
    <div className="px-12 py-6 mb-6 border-b-2 border-gray-100 ">
      <ul
        ref={scrollContainerRef}
        className="flex overflow-x-auto flex-nowrap no-scrollbar"
        style={{ WebkitOverflowScrolling: 'touch' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {list?.map((city, idx) => (
          <li
            key={idx}
            onClick={() => {
              actions.setCity(city);
              setActive(idx);
            }}
            className={`select-none items-stretch inline-block p-2 btn1 grow flex-nowrap whitespace-nowrap ${active === idx ? 'rounded-md bg-gray-800 font-bold text-white' : ''} `}
          >
            {city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Filter;
