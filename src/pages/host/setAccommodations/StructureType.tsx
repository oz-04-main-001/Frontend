//건물 타입선택
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../assets/Header';
import Chips from '../../../assets/Chips';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const StructureType: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedOption } = location.state || {
    selectedOption: '선택된 유형 없음',
  };

  const [selectedBuilding, setSelectedBuilding] = useState<string | null>(null);

  const buildings = [
    '펜션',
    '아파트',
    '빌라',
    '단독주택',
    '호텔',
    '아파트2',
    '빌라2',
  ];

  const handleBuildingClick = (building: string) => {
    setSelectedBuilding(building);
  };
  const handleNextClick = () => {
    if (selectedOption === '하나의 숙소를 한팀이 전부 사용해요.') {
      navigate('/only-starter-room', { state: { selectedBuilding } });
    } else if (selectedOption === '하나의 숙소에 객실이 여러개 있어요.') {
      navigate('/multi-accommodations', { state: { selectedBuilding } });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header labels={[
        { title: '게스트 메인', link: '/guest' },
        { title: '서비스 등록', link: '/register' },
        { title: '로그아웃', link: '/logout' }
      ]} />
      <div className="flex flex-col items-start justify-start w-5/6 mx-auto mt-[12vh]">
        <div className="flex items-center mb-6">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className="w-6 h-6"
            onClick={() => navigate(-1)}
          />
          <span className="ml-2 text-xl font-bold">건물 선택</span>
        </div>

        <div className="flex flex-col items-center w-full mb-10">
          <h3 className="w-full mb-8 text-2xl font-bold text-left">
            {selectedOption}
          </h3>
          <div className="grid w-full grid-cols-5 gap-4">
            {buildings.map((building, index) => (
              <div key={index} onClick={() => handleBuildingClick(building)}>
                <Chips text={building} />
              </div>
            ))}
          </div>

          <div className="flex justify-between w-3/4 gap-4 mt-36">
            <Button
              size={BtnSize.l}
              text="이전"
              type={BtnType.disabled}
              onClick={() => navigate(-1)}
            />
            <Button
              size={BtnSize.l}
              text="다음"
              type={selectedBuilding ? BtnType.normal : BtnType.disabled}
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StructureType;
