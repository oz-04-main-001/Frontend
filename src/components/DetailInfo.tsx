import Carousel from '../assets/carousel/Carousel';
const loremImg = [
  'https://picsum.photos/200/300?random=1',
  'https://picsum.photos/200/300?random=2',
  'https://picsum.photos/200/300?random=3',
];
type Img = string;
export type Imgs = {
  img: Img[];
};
export enum DetailType {
  Accommodations, //숙소
  Stateroom, //객실
}
interface DetailInfoProps {
  subTitle?: string;
  title?: string;
  price?: number | string | null;
  capacity?: number;
  detailType?: DetailType;
}
export default function DetailInfo({
  subTitle,
  title,
  price,
  capacity,
  detailType,
}: DetailInfoProps) {
  return (
    <>
      <Carousel imgs={loremImg} />
      <div className="flex items-end justify-between mt-8">
        <div className="w-full">
          <h6 className="text-gray-500">{subTitle}</h6>
          <div className="flex justify-between">
            <h3>{title}</h3>
            <div className="flex items-end ">
              <h6>{price}원</h6>
              {detailType ? (
                <p className="text-gray-400 b2"> /1박</p>
              ) : (
                <h6> ~</h6>
              )}
            </div>
          </div>
        </div>
      </div>
      {detailType ? (
        <div className="flex gap-2">
          <ul className="text-gray-700 b2">
            <li>기준인원</li>
            <li>침대</li>
            <li>방</li>
          </ul>
          <ul className="text-gray-700 b1">
            <li>기준 {capacity}인</li>
            <li>더블침대 1개</li>
            <li>방 1개</li>
          </ul>
        </div>
      ) : (
        ''
      )}
    </>
  );
}
