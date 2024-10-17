import React from 'react';

interface PopupProps {
  title: string;
  onClose: () => void;
  subTitle: string;
  children: React.ReactNode;
  onPrev: () => void; // 이전 버튼 클릭 핸들러
  onNext: () => void;
  titleClass?: string;
  subTitleClass?: string;
  containerClass?: string;
}

const Popup: React.FC<PopupProps> = ({
  title = 'Title',
  onClose,
  subTitle,
  titleClass = 'font-bold text-3xl', // 기본 폰트 스타일
  subTitleClass = 'text-sm', // 기본 폰트 스타일
  containerClass = 'w-[560px] h-auto', // 컨테이너 크기
  children,
  onPrev,
  onNext,
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className={`relative bg-white rounded-md shadow-lg px-10 py-[30px] flex justify-center items-center flex-col ${containerClass}`}
      >
        {/* 부모 요소에 relative를 추가하여 버튼의 위치 기준 설정 */}
        <button
          onClick={onClose}
          className="absolute top-[30px] left-10 text-xl w-6 h-6 font-bold text-white bg-black rounded-xl"
        >
          ×
        </button>
        <h2 className={`text-center pt- ${titleClass}`}>{title}</h2>
        <p className={`text-center pt-2 pb-3 ${subTitleClass}`}>{subTitle}</p>
        <div className="mt-4">{children}</div>
        <div className="flex justify-between mt-6 mx-10 w-full">
          {/* 이전 버튼 */}
          <button
            onClick={onPrev}
            className="bg-gray-200 text-black w-[14.25rem] h-[3.75rem] rounded"
          >
            이전
          </button>
          {/* 다음 버튼 */}
          <button
            onClick={onNext}
            className="bg-primary-600 text-white w-[14.25rem] h-[3.75rem] rounded"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
