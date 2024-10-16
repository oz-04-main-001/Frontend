interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function Arrow({ onClick }: NextArrowProps) {
  return (
    <div
      onClick={onClick}
      className="flex items-center justify-center border-2 border-gray-100 border-solid rounded-full w-11 h-11"
    >
      Arrow
    </div>
  );
}
