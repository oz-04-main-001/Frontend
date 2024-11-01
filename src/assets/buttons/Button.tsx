interface ButtonProps {
  size?: BtnSize;
  text?: string;
  type?: BtnType; 
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  htmlType?: "button" | "submit" | "reset";
  className?: string; 
  disabled?: boolean;
}

export enum BtnSize {
  m = 'm',
  l = 'l',
}

export enum BtnType {
  normal = 'normal',
  disabled = 'disabled',
  popup = 'popup',
  line = 'line',
  err = 'err',
  submit = 'submit', 
}

const btnSize = (size: BtnSize) => {
  switch (size) {
    case BtnSize.m:
      return 'b2';
    case BtnSize.l:
      return 'b1';
    default:
      return 'b2';
  }
};

export default function Button({
  size = BtnSize.l,
  text = 'Button',
  type = BtnType.normal,
  htmlType = "button", // 기본값을 normal로 변경
  onClick,
  className, // className 추가
}: ButtonProps) {
  const btnType = (type: BtnType) => {
    switch (type) {
      case BtnType.normal:
        return 'bg-primary-600 text-white h-full';
      case BtnType.disabled:
        return 'bg-gray-200 text-gray-400';
      case BtnType.line:
        return 'bg-gray-100 text-gray-400 border-2 border-gray-100 border-solid';
      case BtnType.popup:
        return 'bg-gray-200/30 text-gray-700 h-full';
      case BtnType.err:
        return 'bg-state-err text-white';
      case BtnType.submit: // submit 타입에 대한 처리 추가
        return 'bg-primary-600 text-white'; // 예시로 기본 스타일 설정
      default:
        return 'bg-primary-600 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      type={type === BtnType.submit ? 'submit' : 'button'} // BtnType이 submit일 경우 'submit'으로 설정
      className={`w-full p-2 rounded-md ${btnType(type)} ${btnSize(size)} transition duration-300 ease-in-out hover:scale-105 focus:opacity-75 ${className}`} // className 적용
    >
      {text}
    </button>
  );
}
