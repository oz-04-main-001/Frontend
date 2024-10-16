//예진
import React, { useState } from 'react';

const DropdownMenu: React.FC = () => {
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
    <div className="relative inline-block text-left">
      {/* Dropdown 버튼 */}
      <div>
        <button
          onClick={toggleDropdown}
          className="inline-flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="w-full text-center">
            {selectedItem ? selectedItem : 'Select an Item'}
          </span>
          <svg
            className="w-5 h-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>
      </div>

      {/* Dropdown 메뉴 */}
      {isOpen && (
        <div className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1 text-center" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <a
              onClick={() => handleItemClick('Item One')}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
            >
              Item One
            </a>
            <a
              onClick={() => handleItemClick('Item Two')}
              className="block px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 hover:text-gray-900"
            >
              Item Two
            </a>
            <a
              onClick={() => handleItemClick('Item Three')}
              className="block px-4 py-2 text-sm text-gray-700 bg-blue-100 cursor-pointer hover:bg-blue-100 hover:text-gray-900"
            >
              Item Three
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
