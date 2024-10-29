import usePopupStore from '../stores/usePopupStore';
import Button from '../assets/buttons/Button';
import { BtnSize, BtnType } from '../assets/buttons/Button';
import close from '../assets/icons/close.svg';
import { MouseEventHandler } from 'react';

interface PopupProps {
  title?: string;
  subTitle?: string;
  children?: React.ReactNode;
  buttonText?: { text1?: string; text2?: string };
  onClickLogic2?: MouseEventHandler;
  titleClass?: string;
  onClose?: () => void;
  subTitleClass?: string;
  containerClass?: string;
}

function Popup({
  title = 'Title',
  subTitle,
  titleClass = 'font-bold text-3xl',
  subTitleClass = 'text-sm',
  containerClass = 'w-[560px] h-auto',
  onClickLogic2,
  onClose,
  children,
  buttonText = { text1: '이전', text2: '다음' },
}: PopupProps): JSX.Element {
  const popup = usePopupStore(state => state.popup);
  const closePopup = () => {
    if (onClose) onClose();
    usePopupStore.getState().closePopup();
  };

  return (
    <>
      {popup && (
        <div className="fixed z-[9999] inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`relative bg-white rounded-md shadow-lg px-10 py-8 flex flex-col ${containerClass}`}
          >
            <img
              src={close}
              alt="닫힘 버튼"
              onClick={closePopup}
              className="absolute top-[30px] m-0 p-0 text-xs left-10 w-6 h-6 font-extrabold rounded-xl transition duration-100 hover:scale-105 focus:opacity-85"
            />

            <h2 className={`text-center mx-6 ${titleClass}`}>{title}</h2>
            <p className={`text-center pt-2 pb-3 ${subTitleClass}`}>
              {subTitle}
            </p>
            <div className="mt-4">{children}</div>
            <div className="flex justify-center mt-6 mx-10">
              <div className="flex justify-between w-[30rem] h-[3.75rem] space-x-8">
                <div className="w-56">
                  <Button
                    size={BtnSize.l}
                    text={buttonText.text1}
                    type={BtnType.popup}
                    onClick={closePopup}
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
      )}
    </>
  );
}

export default Popup;
