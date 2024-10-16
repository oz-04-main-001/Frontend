import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Arrow from './Arrow';

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 2,
    nextArrow: <Arrow />,
    prevArrow: <Arrow />,
    dotsClass: 'custom-dots',
  };
  return (
    <div className="">
      <Slider
        {...settings}
        className="flex items-center justify-center w-full gap-9"
      >
        <div className="w-full bg-gray-100 min-h-96"></div>
        <div className="w-3 h-5 bg-gray-100"></div>
      </Slider>
    </div>
  );
}
