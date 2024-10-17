import Button from '../../assets/buttons/Button';
import { BtnSize, BtnType } from '../../assets/buttons/Button';

export default function StateroomCard() {
  return (
    <div className="flex gap-8 p-5 mb-8 rounded-md bg-gray-50">
      <div className="flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-gray-100 border-solid rounded-md aspect-square basis-1/4">
        <img src="/staynest.svg" alt="logo" className="object-cover w-full" />
      </div>
      <div className="grow">
        <h4>객실</h4>
        <p className="text-right b1 text-primary-600">상세보기</p>
        <div className="p-3 bg-white rounded-md mt-7">
          <div className="pb-1 text-gray-400 b2">
            <p>입실 16:00</p>
            <p>퇴실 11:00</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-end justify-end pb-1 b2">
              <h6 className="text-gray-800 s1 ">123</h6>
              <p className="text-gray-400 b2"> /1박</p>
            </div>
            <div className="flex justify-end w-full text-right">
              <div>
                <Button
                  size={BtnSize.m}
                  text="객실예약"
                  type={BtnType.normal}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-3 mt-2 text-gray-400 bg-white rounded-md">
          <div className="c2">객실정보</div>
          <ul className="text-gray-300 c1">
            <li>기준 2인</li>
            <li>더블 침대 1개, 방 1개</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
