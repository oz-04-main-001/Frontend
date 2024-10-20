interface ButtonProps {
  size?: BtnSize;
  text?: string;
  type?: BtnType;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string; // className 추가
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
}

const btnSize = (size: BtnSize) => {
  switch (size) {
    case BtnSize.m: // 'm' 대신 enum 사용
      return 'b2';
    case BtnSize.l: // 'l' 대신 enum 사용
      return 'b1';
    default:
      return 'b2';
  }
};

export default function Button({
  size = BtnSize.l,
  text = 'Button',
  type = BtnType.err,
  onClick,
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
      default:
        return 'bg-primary-600 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full p-2 rounded-md ${btnType(type)} ${btnSize(size)} transition duration-300 ease-in-out hover:scale-105 focus:opacity-75`}
    >
      {text}
    </button>
  );
}
