import { useNavigate, useParams } from 'react-router-dom';
import Divider from '../../assets/Divider';
import DetailInfo from '../../components/DetailInfo';
import InfoTemp2 from '../../components/InfoTemp2';
import Layout from '../../layouts/Layout1';
import { DetailType } from '../../components/DetailInfo';
import Button from '../../assets/buttons/Button';
import { BtnSize, BtnType } from '../../assets/buttons/Button';
import { useEffect } from 'react';
import { getStateRoomLoad } from '../../axios/roomApi';
import { useAccommodationsStore } from '../../stores/useAccommodationsStore';
import { AxiosError } from 'axios';
import { useStateroomStore } from '../../stores/useStateroomStore';
import { useSearchStore } from '../../stores/useSearchStore';
import useDateCount from '../../customHooks/useDateCount';
import Header from '../../assets/Header';

export default function Stateroom() {
  const navigate = useNavigate();
  const { accommodationId, stateroomId } = useParams();
  const { search } = useSearchStore();
  const { stateRoom, actions } = useStateroomStore();
  const { accommodation } = useAccommodationsStore();
  const dateCount = useDateCount(search.date.checkIn, search.date.checkOut);
  const texts = ['주차가능', '조식운영'];
  useEffect(() => {
    const fetchGetLoad = async () => {
      try {
        const loadCard = await getStateRoomLoad(
          Number(accommodationId),
          Number(stateroomId)
        );
        actions.setStateRoomInfo(loadCard);
        console.log(stateRoom);
      } catch (err) {
        const axiosError = err as AxiosError;
        if (axiosError.response) {
          const statusCode = axiosError.response.status;
          switch (statusCode) {
            case 401:
              // navigate('/user/login');
              break;
            default:
              console.log('요청 에러');
              break;
          }
        }
      }
    };
    fetchGetLoad();
  }, []);
  return (
    <>
      <Header />
      <div className="mb-36">
        <Layout>
          <DetailInfo
            subTitle={accommodation.address}
            title={stateRoom.accommodation_name}
            price={stateRoom.price}
            capacity={stateRoom.capacity}
            detailType={DetailType.Stateroom}
          />
        </Layout>
        <Divider />
        <Layout>
          <div className="p-6 border-2 border-gray-100 border-solid rounded-md">
            <div>
              <p className="mb-3 text-gray-800 c1">숙박</p>
              <p className="mb-1 b2">
                체크인
                <span className="ml-1 b1">
                  {`${search.date.checkIn} ${stateRoom.check_in_time}`}
                </span>
                ~ 체크아웃
                <span className="ml-1 b1">{`${search.date.checkOut} ${stateRoom.check_out_time}`}</span>
              </p>
              <p className=" b2">
                인원
                <span className="ml-1 b1">
                  성인 {search.personnel.adult}명{' '}
                  {search.personnel.infant > 0
                    ? `유아${search.personnel.infant}명`
                    : ''}
                </span>
              </p>
            </div>
            <div className="mt-6 text-right text-gray-800 s1">
              {Number(stateRoom.price) * Number(dateCount)}원
              <span className="text-gray-400 b2">/{dateCount}박</span>
            </div>
          </div>
        </Layout>
        <Divider />
        <Layout>
          <InfoTemp2 title="객실 서비스" texts={texts} />
        </Layout>
      </div>

      <div className="fixed bottom-0 flex justify-between w-full px-20 py-4 bg-white border-t-2 border-gray-100 border-solid">
        <div>
          <p className="b2">
            {search.date.checkIn} ~ {search.date.checkOut}
          </p>
          <h4>
            {Number(stateRoom.price) * Number(dateCount)}
            <span className="text-gray-400 b1">/{dateCount}박</span>
          </h4>
        </div>
        <div className="w-1/3 py-2">
          <Button
            size={BtnSize.l}
            text="예약하기"
            type={stateRoom.stay_type ? BtnType.normal : BtnType.disabled}
            onClick={() => {
              navigate(
                `/reservation/stateroom/order/${accommodationId}/${stateroomId}`
              );
            }}
          />
        </div>
      </div>
    </>
  );
}
