import React from 'react';
import Button from '../assets/buttons/Button';
import { BtnSize, BtnType } from '../assets/buttons/Button';

interface PopupProps {
  title: string;
  onClose: () => void;
  subTitle?: string;
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
  subTitle,
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
        className={`relative bg-white rounded-md shadow-lg px-10 py-[30px] flex flex-col ${containerClass}`} // 호환성에 문제가 있어서 이 부분 조금 수정했어요. 필요하면 containerClass 프롭으로 받아서 넣어주시면 됩니다.
      >
        <button
          onClick={onClose}
          className="absolute top-[30px] m-0 p-0 text-xs left-10 w-6 h-6 font-extrabold text-white bg-black rounded-xl transition duration-100 hover:scale-105 focus:opacity-85"
        >
          ×
        </button>
        <h2 className={`text-center pt- ${titleClass}`}>{title}</h2>
        <p className={`text-center pt-2 pb-3 ${subTitleClass}`}>{subTitle}</p>
        <div className="mt-4">{children}</div>
        <div className="flex justify-center mt-6 mx-10">
          <div className="flex justify-between w-[30rem] h-[3.75rem] ">
            <div className="w-56">
              <Button
                size={BtnSize.l}
                text={buttonText.text1}
                type={BtnType.popup}
                onClick={onClickLogic1}
              />
            </div>
            <div className="w-56">
              <Button
                size={BtnSize.l}
                text={buttonText.text2}
                type={BtnType.normal}
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
