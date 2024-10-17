import Button from '../../assets/buttons/Button';
import Carousel from '../../assets/carousel/Carousel';
import Chips from '../../assets/Chips';

export default function index() {
  const loremImg = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
  ];
  return (
    <>
      <Chips />
      <Button />
      <Carousel imgs={loremImg} />
    </>
  );
}
