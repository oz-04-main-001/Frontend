import { useNavigate, useParams } from 'react-router-dom';
import Button, { BtnType, BtnSize } from '../../assets/buttons/Button';
import Divider from '../../assets/Divider';
import InfoTemp from '../../components/InfoTemp1';
import Layout from '../../layouts/Layout1';
import CheckInOut from '../../components/CheckInOut';
import { useSearchStore } from '../../stores/useSearchStore';
import { useStateroomStore } from '../../stores/useStateroomStore';
import useDateCount from '../../customHooks/useDateCount';
import { postBooking } from '../../axios/orderApi';
import { AxiosError } from 'axios';
import useTimeFormet from '../../customHooks/useTimeFormet';
import useDateDotFormet from '../../customHooks/useDateDotFormet';
import useDateDashFormet from '../../customHooks/useDateDashFormet';
import usePriceFormet from '../../customHooks/usePriceFormet';

export default function Orders() {
  const navigate = useNavigate();
  const { accommodationId, stateroomId } = useParams();
  const { search } = useSearchStore();
  const { stateRoom } = useStateroomStore();
  const dateCount = useDateCount(search.date.checkIn, search.date.checkOut);
  const checkInDate = useDateDashFormet(search.date.checkIn);
  const checkOutDate = useDateDashFormet(search.date.checkOut);
  const guestsCount = search.personnel.adult;

  const fetchGetLoad = async () => {
    if (accommodationId && stateroomId) {
      try {
        const order = await postBooking(
          accommodationId,
          stateroomId,
          checkInDate,
          checkOutDate,
          guestsCount
        );
        console.log('예약이 성공적으로 완료되었습니다!', order);
        await navigate(`/mypage`);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const statusCode = axiosError.response.status;
          switch (statusCode) {
            case 401:
              navigate('/user/login');
              break;
            default:
              console.log('요청 에러');
              break;
          }
        }
      }
    }
  };
  const priceFormet = usePriceFormet(
    stateRoom.room.price,
    search.date.checkIn,
    search.date.checkOut
  );
  return (
    <>
      <Layout>
        <div className="">
          <div>
            <h6 className="text-gray-500">{}</h6>
            <h3 className="mt-2">{stateRoom.room.name}</h3>
            <p className="text-gray-400 b2">
              기준 {stateRoom.room.capacity}인, 싱글침대 1개, 방 1개
            </p>
          </div>
          <div className="flex mt-8">
            <CheckInOut
              title="체크인"
              date={`${useDateDotFormet(search.date.checkIn)} ${useTimeFormet(stateRoom.room.check_in_time)}`}
            />
            <CheckInOut
              title="체크아웃"
              date={`${useDateDotFormet(search.date.checkOut)} ${useTimeFormet(stateRoom.room.check_out_time)}`}
            />
          </div>
          <p className="mt-6 b2">
            인원
            <span className="ml-1 b1">
              성인 {search.personnel.adult}명{' '}
              {search.personnel.infant === 0
                ? ''
                : `유아 ${search.personnel.infant}명`}
            </span>
          </p>
        </div>
        <div className="mt-6 text-right text-gray-800 s1">
          {priceFormet}원
          <span className="text-gray-400 b2">/{dateCount}박</span>
        </div>
      </Layout>
      <Divider />
      <Layout>
        <InfoTemp title="예약자 정보" text="한기선/01023445566" />
      </Layout>
      <Divider />
      <Layout>
        <div className="my-20">
          <Button
            size={BtnSize.l}
            text={`${priceFormet}원 결제하기`}
            type={BtnType.normal}
            onClick={fetchGetLoad}
          />
        </div>
      </Layout>
    </>
  );
}
