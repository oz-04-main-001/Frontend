//숙소유형선택
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Header from '../../../assets/Header'; 
import Chips from '../../../assets/Chips'; 
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button'; 
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const SelectType: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const navigate = useNavigate(); 

  const handleOptionClick = (option: string) => {
    if (selectedOption === option) {
      setSelectedOption(null);
    } else {
      setSelectedOption(option);
    }
  };

  const handleNextClick = () => {
    if (selectedOption === 'entire') {
      navigate('/only-starter-room');
    } else if (selectedOption === 'multiple') {
      navigate('/multi-accommodations');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header labels={['게스트 메인', '새 숙소 등록', '로그아웃']} />

      <div className="flex flex-col items-start justify-start w-5/6 mx-auto mt-[12vh]">
        <div className="flex items-center mb-6">
          <img src={ArrowIcon} alt="Arrow Icon" className="w-6 h-6 cursor-pointer" onClick={() => navigate(-1)} />
          <span className="ml-2 text-xl font-bold">유형 선택</span>
        </div>

        <div className="w-full">
          <h3 className="mb-8 font-bold text-left">숙소 유형을 선택해주세요.</h3>
          <div className="space-y-8">
            <div onClick={() => handleOptionClick('entire')}>
              <Chips text="하나의 숙소를 한팀이 전부 사용해요." />
            </div>

            <div onClick={() => handleOptionClick('multiple')}>
              <Chips text="하나의 숙소에 객실이 여러개 있어요." />
            </div>
          </div>
        </div>

        <div className="flex justify-center w-full mt-12">
          <div className="w-1/3">
            <Button
              size={BtnSize.m}
              text="다음"
              type={selectedOption ? BtnType.normal : BtnType.disabled} 
              onClick={handleNextClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectType;
