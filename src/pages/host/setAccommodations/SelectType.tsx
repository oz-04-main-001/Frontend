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
      setSelectedOption(null); // 이미 선택된 옵션 선택 해제 
    } else {
      setSelectedOption(option);
    }
  };

  const handleNextClick = () => {
    if (selectedOption) {
      navigate('/structure-type', { state: { selectedOption } });
    } else {
      alert('리스트에서 하나를 선택해 주세요.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header labels={[
          { title: '게스트 메인', link: '/guest' }, 
          { title: '서비스 등록', link: '/register' }, 
          { title: '로그아웃', link: '/logout' }
        ]}  />

      <div className="flex flex-col items-start justify-start w-5/6 mx-auto mt-[12vh]">
        <div className="flex items-center mb-6">
          <img src={ArrowIcon} alt="Arrow Icon" className="w-6 h-6" onClick={() => navigate(-1)} />
          <span className="ml-2 text-xl font-bold">유형 선택</span>
        </div>

        <div className="flex flex-col items-center w-full mb-10">
          <h3 className="w-full mb-8 text-2xl font-bold text-left">숙소 유형을 선택해주세요.</h3>

          <div className="w-full space-y-4">
            <div onClick={() => handleOptionClick('하나의 숙소를 한팀이 전부 사용해요.')}>
              <Chips text="하나의 숙소를 한팀이 전부 사용해요." />
            </div>

            <div onClick={() => handleOptionClick('하나의 숙소에 객실이 여러개 있어요.')}>
              <Chips text="하나의 숙소에 객실이 여러개 있어요." />
            </div>
          </div>

          <div className="w-2/5 mt-36">
            <Button
              size={BtnSize.l}
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
