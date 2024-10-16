type ButtonProps = {
  size?: BtnSize;
  text?: string;
  type?: BtnType;
};
enum BtnSize {
  m = 'm',
  l = 'l',
}
enum BtnType {
  normal = 'normal',
  disabled = 'disabled',
  popup = 'popup',
  line = 'line',
  err = 'err',
}
const btnSize = (size: BtnSize) => {
  switch (size) {
    case 'm':
      return 'b2';
    case 'l':
      return 'b1';
    default:
      return 'b2';
  }
};

export default function Button({
  size = BtnSize.l,
  text = 'Button',
  type = BtnType.err,
}: ButtonProps) {
  const btnType = (type: BtnType) => {
    switch (type) {
      case 'normal':
        return 'bg-primary-600 text-white ';
      case 'disabled':
        return 'bg-gray-200 text-gray-400';
      case 'line':
        return 'bg-gray-100 text-gray-400 border-2 border-gray-100 border-solid';
      case 'popup':
        return 'bg-gray-200/30 text-gray-700';
      case 'err':
        return 'bg-state-err text-white';
      default:
        return 'bg-primary-600 text-white ';
    }
  };
  return (
    <button
      type="button"
      className={`w-full p-2 rounded-md ${btnType(type)} ${btnSize(size)} transition duration-300 ease-in-out hover:scale-125 focus:opacity-75`}
    >
      {text}
    </button>
  );
}
