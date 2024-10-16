//예진
import React, { useState } from 'react';

const CustomCheckbox: React.FC = () => {
  const [checked, setChecked] = useState(false);

  const handleCheckboxClick = () => {
    setChecked(!checked);
  };

  return (
    <div className="flex items-center cursor-pointer" onClick={handleCheckboxClick}>
      <div className="flex items-center justify-center w-6 h-6">
        {checked ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" fill="#0378D6" rx="3" />
            <path
              fill="#fff"
              d="M8.293 13.293l-2.293-2.293a1 1 0 1 1 1.414-1.414l1.293 1.293 4.293-4.293a1 1 0 1 1 1.414 1.414l-5 5a1 1 0 0 1-1.414 0Z"
            />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
            <rect width="20" height="20" fill="#BDC8DA" rx="3" />
            <rect width="19" height="19" x="0.5" y="0.5" stroke="#98A6C1" strokeWidth="1" rx="2.5" />
          </svg>
        )}
      </div>
      <span className="ml-2 font-sans text-black">Label</span>
    </div>
  );
};

export default CustomCheckbox;

