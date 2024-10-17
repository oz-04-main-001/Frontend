import React from 'react';
import Button from '../assets/buttons/Button';
import { BtnSize, BtnType } from '../assets/buttons/Button';

interface PopupProps {
  title: string;
  onClose: () => void;
  subTitle: string;
  children: React.ReactNode;
  buttonText: { text1?: string; text2?: string };
  onClickLogic1: () => void;
  onClickLogic2: () => void;

  titleClass?: string;
  subTitleClass?: string;
  containerClass?: string;
}

const Popup: React.FC<PopupProps> = ({
  title = 'Title',
  onClose,
  subTitle = 'subTitle',
  titleClass = 'font-bold text-3xl',
  subTitleClass = 'text-sm',
  containerClass = 'w-[560px] h-auto',
  children,
  buttonText = { text1: '이전', text2: '다음' },
  onClickLogic1,
  onClickLogic2,
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
          {/* <button
            onClick={onPrev}
            className="bg-gray-200 text-black w-[14.25rem] h-[3.75rem] rounded"
          >
            이전
          </button>
         
          <button
            onClick={onNext}
            className="bg-primary-600 text-white w-[14.25rem] h-[3.75rem] rounded"
          >
            다음
          </button> */}
          <div className="flex justify-between w-[30rem] h-[3.75rem]">
            <div className="w-[14.25rem]">
              <Button
                size={BtnSize.l}
                text={buttonText.text1}
                type={BtnType.popup}
                onClick={onClickLogic1}
              />
            </div>
            <div className="w-[14.25rem]">
              <Button
                size={BtnSize.l}
                text={buttonText.text2}
                type={BtnType.popup}
                onClick={onClickLogic2}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
