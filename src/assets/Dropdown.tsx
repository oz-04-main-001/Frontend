//예진
import React, { useState } from 'react';

interface DropdownProps {
  width?: string;
  menuItems: string[];
}

const Dropdown: React.FC<DropdownProps> = ({ width = '200px', menuItems }) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left" style={{ width }}>
      {/* 드롭다운 버튼 */}
      <button
        onClick={toggleDropdown}
        className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
      >
        <span className="w-full text-center">
          {selectedItem ? selectedItem : 'Select an Item'}
        </span>
      </button>

      {/* 드롭다운 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 w-full mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(item)}
                className={`block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-primary-300 hover:text-gray-900 ${selectedItem === item ? 'bg-primary-300' : ''
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