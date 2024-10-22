//예진
import React, { useState } from 'react';

interface DropdownProps {
  width?: string;
  menuItems: string[];
  title?: string;
  style?: string | undefined;
  btnStyle?: string | undefined;
  selectedItem: string | null;
  setSelectedItem: (item: string) => void;
  onClick: (item: string) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  width = '200px',
  menuItems,
  title = 'Select an Item',
  style = 'text-center',
  btnStyle = 'text-sm font-medium px-4 py-2',
  selectedItem,
  setSelectedItem,
  onClick,
}) => {
  // const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    onClick(item);
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left z-50" style={{ width }}>
      <button
        onClick={toggleDropdown}
        className={`inline-flex items-center justify-between w-full  ${btnStyle} text-gray-700 rounded-md focus:outline-none`}
      >
        <span className={`w-full  ${style}`}>
          {selectedItem ? selectedItem : title}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1 text-center"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-primary-300 hover:text-gray-900 ${
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
