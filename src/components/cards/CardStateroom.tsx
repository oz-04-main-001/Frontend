import { useNavigate } from 'react-router-dom';
import Button from '../../assets/buttons/Button';
import { BtnSize, BtnType } from '../../assets/buttons/Button';
import { useAccommodationsStore } from '../../stores/useAccommodationsStore';
import useErrorImage from '../../customHooks/useErrorImage';
import useAuthStore from '../../stores/useAuthStore';

interface StateRoomCardProp {
  id: number;
  image?: string;
  title: string;
  checkIn: string;
  checkOut: string;
  price: number | string;
  capacity: number;
  btn: boolean;
}

export default function StateroomCard({
  id,
  image = '/staynest.svg',
  title,
  checkIn,
  checkOut,
  price,
  capacity,
  btn,
}: StateRoomCardProp) {
  const navigate = useNavigate();
  const handleErrorImage = useErrorImage();
  const { accommodationId } = useAccommodationsStore();
  const { usertype } = useAuthStore();

  return (
    <div className="flex gap-8 p-5 mb-8 rounded-md bg-gray-50">
      <div className="flex items-center justify-center overflow-hidden bg-gray-100 border-2 border-gray-100 border-solid rounded-md aspect-square basis-1/4">
        <img
          src={image}
          alt={image}
          className="object-cover w-full"
          onError={handleErrorImage}
        />
      </div>
      <div className="grow">
        <h4>{title}</h4>
        <div className="text-right">
          {btn ? (
            <button
              type="button"
              className="text-right b1 text-primary-600 "
              onClick={() => {
                navigate(`/accommodations/stateroom/${accommodationId}/${id}`);
              }}
            >
              상세보기
            </button>
          ) : (
            ''
          )}
        </div>

        <div className="p-3 bg-white rounded-md mt-7">
          <div className="pb-1 text-gray-400 b2">
            <p>입실 {checkIn}</p>
            <p>퇴실 {checkOut}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex items-end justify-end pb-1 b2">
              <h6 className="text-gray-800 s1 ">{price}</h6>
              <p className="text-gray-400 b2"> /1박</p>
            </div>
            <div className="flex justify-end w-full text-right">
              <div>
                {usertype ? (
                  <Button
                    onClick={() => {
                      navigate(
                        `/reservation/stateroom/order/${accommodationId}/${id}`
                      );
                    }}
                    size={BtnSize.m}
                    text={btn ? '객실 예약' : '예약불가능'}
                    type={btn ? BtnType.normal : BtnType.disabled}
                  />
                ) : (
                  <div
                    onClick={() => {
                      navigate(`/user/login`);
                    }}
                  >
                    <Button
                      size={BtnSize.m}
                      text="로그인해주세요."
                      type={BtnType.disabled}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 p-3 mt-2 text-gray-400 bg-white rounded-md">
          <div className="c2">객실정보</div>
          <ul className="text-gray-300 c1">
            <li>기준 {capacity}인</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
