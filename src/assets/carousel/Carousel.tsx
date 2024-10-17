import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Arrow from './Arrow';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './carouselStyle.css';

interface CarouselProps {
  imgs: string[];
}
export default function Carousel({ imgs }: CarouselProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="">
      <Slider {...settings} className="">
        {imgs?.map((img, idx) => (
          <div key={idx} className="w-full bg-gray-200">
            <img className="w-fll" src={img} alt={img} />
          </div>
        ))}
      </Slider>
    </div>
  );
}
