//숙소유형선택
import React, { useState } from 'react';
import Header from '../../../assets/Header'; // 헤더 컴포넌트 가져오기
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button'; // 버튼 컴포넌트 가져오기

const SelectType: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* 헤더 컴포넌트 */}
      <Header labels={['게스트 메인', '새 숙소 등록', '로그아웃']} />

      {/* 중앙 정렬 및 공백 조정 */}
      <div className="flex flex-col items-start justify-start flex-grow max-w-lg px-6 py-20 mx-auto">
        {/* 제목 */}
        <h1 className="mb-8 text-2xl font-bold text-left">숙소 유형을 선택해주세요.</h1>

        {/* 선택 옵션 */}
        <div className="w-full space-y-4">
          <Button
            size={BtnSize.l}
            text="하나의 숙소를 한팀이 전부 사용해요."
            type={BtnType.line} // 항상 line 타입 사용
            onClick={() => handleOptionClick('entire')}
            className={`text-left ${selectedOption === 'entire' ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'}`}
          />

          <Button
            size={BtnSize.l}
            text="하나의 숙소에 객실이 여러개 있어요."
            type={BtnType.line} // 항상 line 타입 사용
            onClick={() => handleOptionClick('multiple')}
            className={`text-left ${selectedOption === 'multiple' ? 'bg-white text-gray-900' : 'bg-gray-50 text-gray-400'}`}
          />
        </div>

        {/* 다음 버튼 */}
        <div className="w-full mt-8">
          <Button
            size={BtnSize.l}
            text="다음"
            type={selectedOption ? BtnType.normal : BtnType.disabled} // '다음' 버튼은 선택 여부에 따라 타입 변화
            onClick={() => console.log('다음 버튼 클릭')}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SelectType;

