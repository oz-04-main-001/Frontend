import PaymentInfo from './PaymentInfo';
import GuestInfo from './GuestInfo';
import Divider from '../../assets/Divider';
import Layout from '../../layouts/Layout2';
import AccomoInfoCard from './AccmoInfoCard';
import { useEffect, useState } from 'react';
import { getBookingStatus } from '../../axios/orderApi';
import { useParams } from 'react-router-dom';
import { BadgeStatus } from '../../assets/Badges';
import useDateDotFormet from '../../customHooks/useDateDotFormet';
import useTimeFormet from '../../customHooks/useTimeFormet';
import useDateCount from '../../customHooks/useDateCount';

interface OrderInfo {
  id: number | string;
  room: {
    id: number | string;
    name: string;
    capacity: number;
    max_capacity: number;
    description: string;
    price: number;
    check_in_time: string;
    check_out_time: string;
    bed_info: {
      total_beds: number;
      bed_names: string[];
    };
  };
  booking_user_info: {
    name: string;
    phone_number: string;
    email: string;
  };
  check_in_datetime: string;
  check_out_datetime: string;
  total_price: number | string;
  status: BadgeStatus;
  request: string;
  guests_count: number;
  booker_name: string;
  booker_phone_number: string;
  guest: number;
}

export default function ReservationCompleted() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const { orderId } = useParams();
  useEffect(() => {
    const fetchGetLoad = async () => {
      if (orderId) {
        const loadCard = await getBookingStatus(orderId);
        setOrderInfo(loadCard);
      }
    };
    fetchGetLoad();
  }, [orderId]);
  const dateCount = orderInfo
    ? (() => {
        const start = new Date(orderInfo.check_in_datetime);
        const end = new Date(orderInfo.check_out_datetime);
        const differenceInTime = end.getTime() - start.getTime();
        return differenceInTime / (1000 * 3600 * 24);
      })()
    : 0;
  return (
    <div className="">
      <Layout>
        {orderInfo ? (
          <AccomoInfoCard
            image={undefined}
            address={undefined}
            status={orderInfo.status}
            stateRoomName={orderInfo.room.name}
            guestsCount={orderInfo.guests_count}
            bed={orderInfo.room.bed_info}
            checkIn={`${useDateDotFormet(orderInfo.check_in_datetime)} ${useTimeFormet(orderInfo.room.check_in_time)}`}
            checkOut={`${useDateDotFormet(orderInfo.check_out_datetime)} ${useTimeFormet(orderInfo.room.check_out_time)}`}
          />
        ) : (
          '예약하신 숙소 정보를 가져오고 있습니다.'
        )}
      </Layout>

      <Divider />
      <Layout>
        {orderInfo ? (
          <GuestInfo
            bookerName={orderInfo.booker_name}
            bookerPhoneNumber={orderInfo.booker_phone_number}
            reservationNumber={orderInfo.id}
          />
        ) : (
          '예약자 정보를 가져오고 있습니다.'
        )}
      </Layout>

      <Divider />
      <Layout>
        {orderInfo ? (
          <PaymentInfo
            title="결제 정보"
            dateCount={dateCount}
            price={orderInfo ? orderInfo.room.price * dateCount : 0}
          />
        ) : (
          '결제 정보를 가져오고 있습니다.'
        )}
      </Layout>
    </div>
  );
}
