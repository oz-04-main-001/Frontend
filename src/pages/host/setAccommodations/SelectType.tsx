//숙소유형선택
import React, { useState } from 'react';
import Header from '../../../assets/Header'; 
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';

const SelectType: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header labels={['게스트 메인', '새 숙소 등록', '로그아웃']} />

      <div className="flex flex-col items-start justify-start flex-grow max-w-lg px-6 py-20 mx-auto">
        <h1 className="mb-8 text-2xl font-bold text-left">숙소 유형을 선택해주세요.</h1>

        <div className="w-full space-y-4">
          <Button
            size={BtnSize.l}
            text="하나의 숙소를 한팀이 전부 사용해요."
            type={BtnType.line} 
            onClick={() => handleOptionClick('entire')}
            className={`text-left ${selectedOption === 'entire' ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'}`}
          />

          <Button
            size={BtnSize.l}
            text="하나의 숙소에 객실이 여러개 있어요."
            type={BtnType.line} 
            onClick={() => handleOptionClick('multiple')}
            className={`text-left ${selectedOption === 'multiple' ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'}`}
          />
        </div>


        <div className="w-full mt-8">
          <Button
            size={BtnSize.l}
            text="다음"
            type={selectedOption ? BtnType.normal : BtnType.disabled} 
            onClick={() => console.log('다음 버튼 클릭')}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectType;

