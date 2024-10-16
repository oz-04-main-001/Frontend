import React from "react";

interface PopupProps {
  title: string;
  onClose: ()=> void
  subTitle: string;
  children: React.ReactNode
  
  
    titleClass?: string;
    subTitleClass?: string;
    containerClass?: string;
  ;
}

const Popup: React.FC<PopupProps> = ({
  title,
  onClose,
  subTitle,
  titleClass = 'fontWeight-bold fontSize-3xl',
  subTitleClass,
  containerClass,
  
  children,
}) => {

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${containerClass}`}
    >
      <div className={`bg-gray-200}`}>
        <button onClick={onClose} className="absolute top-2 right-2">
          ×
        </button>
        <h2 className={`text-lg font-bold ${titleClass}`}>
          {title}
        </h2>
        <p className={`text-sm ${subTitleClass}`}>
          {subTitle}
        </p>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Popup;
