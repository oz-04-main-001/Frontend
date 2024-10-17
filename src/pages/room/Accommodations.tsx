import Carousel from '../../assets/carousel/Carousel';
type Img = string;
export type Imgs = {
  img: Img[];
};
export default function Accommodations() {
  const loremImg = [
    'https://picsum.photos/200/300?random=1',
    'https://picsum.photos/200/300?random=2',
    'https://picsum.photos/200/300?random=3',
  ];
  return (
    <div>
      <header></header>
      <Carousel imgs={loremImg} />
      ss
    </div>
  );
}
