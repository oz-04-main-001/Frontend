import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import useManagementFilterStore from '../stores/useManagementFilterStore';
import BookingListApi from '../axios/BookingListApi';

interface DropdownProps {
  width?: string;
  menuItems: string[] | undefined;
  title?: string;
  style?: string | undefined;
  btnStyle?: string | undefined;
  selectedItem?: string | null;
  setSelectedItem?: Dispatch<SetStateAction<string | null>>;
  onClick?: (item: string) => void;
  tap?: number;
}

const Dropdown: React.FC<DropdownProps> = ({
  width = '200px',
  menuItems,
  title,
  style = 'text-center',
  btnStyle = 'text-sm font-medium px-4 py-2',
  selectedItem = null,
  setSelectedItem = () => {},
  onClick = () => {},
  tap = 0,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const { setFilteredData } = useManagementFilterStore();
  const { data } = BookingListApi();

  useEffect(() => {
    if (menuItems) {
      const filtered = data?.filter(item => item.room_name === selectedItem);
      setFilteredData(filtered);
    }
  }, [selectedItem]);

  useEffect(() => {
    if (tap === 1 || !tap) {
      setSelectedItem(null);
    }
  }, [tap]);

  const handleItemClick = (item: string) => {
    onClick(item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <div className="relative z-50 inline-block text-left" style={{ width }}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex items-center justify-between w-full ${btnStyle} text-gray-700 rounded-md focus:outline-none`}
      >
        <span className={`w-full ${style}`}>
          {tap === 0 || tap === 1
            ? selectedItem
              ? selectedItem
              : title
            : title}
        </span>
      </button>
      {isOpen && (
        <div className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 overflow-y-auto text-xs text-center max-h-60"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuItems?.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`block px-4 py-2 text-xs text-gray-700 cursor-pointer hover:bg-primary-300 hover:text-gray-900 ${
                  selectedItem === item ? 'bg-primary-300' : ''
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
