import React from 'react';

const MainCard: React.FC = () => {
  return (
    <div className="max-w-[200px] w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* 이미지 부분 */}
      <div className="flex items-center justify-center h-32 bg-gray-200">
        <img src="./staynest.svg" alt="숙소 이미지" width="80" height="80" />
      </div>
      {/* 내용 부분 */}
      <div className="p-4">
        <h2 className="mb-1 font-bold text-medium">가나다 숙소</h2>
        <p className="text-xs text-gray-700">₩123,111/박</p>
      </div>
    </div>
  );
};

export default MainCard;
