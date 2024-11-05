import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../../assets/Header';
import Chips from '../../../assets/Chips';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import { useSelectionStore } from '../../../stores/useSelectionStore';

const StructureType: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // 전역 상태에서 selectedOption 및 selectedBuilding 가져오기
  const selectedOption =
    useSelectionStore(state => state.selectedOption) ||
    location.state?.selectedOption ||
    '선택된 유형 없음';
  const selectedBuilding = useSelectionStore(state => state.selectedBuilding);

  const setSelectedBuilding = useSelectionStore(
    state => state.setSelectedBuilding
  );
  const setSelectedOption = useSelectionStore(state => state.setSelectedOption);

  // 처음 컴포넌트가 로드될 때 location의 selectedOption 상태를 전역 상태에 설정
  React.useEffect(() => {
    if (location.state?.selectedOption) {
      setSelectedOption(location.state.selectedOption);
    }
  }, [location.state, setSelectedOption]);

  const buildings =[
    "호텔",
    "리조트",
    "펜션",
    "게스트하우스",
    "호스텔",
    "모텔",
    "캠핑장",
    "빌라",
    "주택"
  ]

  const handleBuildingClick = (building: string) => {
    if (selectedOption === '하나의 숙소를 한팀이 전부 사용해요.') {
      // 독체 관련 옵션을 선택한 경우
      const independentBuilding = `독채${building}`;
      setSelectedBuilding(independentBuilding);
    } else {
      // 일반 건물 타입을 선택한 경우
      setSelectedBuilding(building);
    }
  };

  const handleNextClick = () => {
    if (selectedOption === '하나의 숙소를 한팀이 전부 사용해요.') {
      navigate('/onlyhost/only-accommodation', { state: { selectedBuilding } });
    } else if (selectedOption === '하나의 숙소에 객실이 여러개 있어요.') {
      navigate('/onlyhost/multi-accommodations', {
        state: { selectedBuilding },
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        labels={[
          { title: '게스트 메인', link: '/' },
          { title: '서비스 등록', link: '/host/select-type' },
        ]}
      />
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
              <div
                key={index}
                onClick={() => handleBuildingClick(building)}
                className={`cursor-pointer p-2 rounded ${
                  selectedBuilding === building
                    ? 'bg-[#A0D8F1] text-white'
                    : 'bg-[#E0E0E0]'
                }`}
              >
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
