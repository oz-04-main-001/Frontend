import './carouselStyle.css';

interface NextArrowProps {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export default function Arrow({ onClick }: NextArrowProps) {
  return (
    <div
      onClick={onClick}
      className="absolute flex items-center justify-center border-2 border-gray-100 border-solid rounded-full top-1/2 w-11 h-11"
    >
      Arrow
    </div>
  );
}
