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

interface Bed {
  total_beds: number;
  bed_type_num: null | string;
}
interface OrderInfo {
  id: number | string;
  accommodation_info: {
    name: string;
    representative_image: null | string;
    address: string;
  };
  room_info: {
    id: number | string;
    name: string;
    capacity: 4;
    max_capacity: 5;
    description: string;
    price: string;
    check_in_time: string;
    check_out_time: string;
    bed_info: Bed;
    room_count: number;
  };
  check_in_datetime: string;
  check_out_datetime: string;
  total_price: string;
  status: BadgeStatus;
  request: string;
  guests_count: number;
  booker_name: string;
  booker_phone_number: string;
  guest: number;
  room: number;
}

export default function ReservationCompleted() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const { orderId } = useParams();
  useEffect(() => {
    const fetchGetLoad = async () => {
      if (orderId) {
        try {
          const loadCard = await getBookingStatus(orderId);
          setOrderInfo(loadCard);
        } catch (error) {
          console.error('Error fetching booking status:', error);
        }
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
    <div>
      <Layout>
        {orderInfo ? (
          <AccomoInfoCard
            image={
              orderInfo?.accommodation_info?.representative_image ||
              'defaultImage.jpg'
            }
            address={
              orderInfo?.accommodation_info?.address || 'Address not available'
            }
            status={orderInfo?.status || 'Status unavailable'}
            stateRoomName={
              orderInfo?.room_info?.name || 'Room name unavailable'
            }
            guestsCount={orderInfo?.guests_count}
            bed={
              orderInfo?.room_info?.bed_info || {
                total_beds: 0,
                bed_type_num: {},
              }
            }
            checkIn={`${useDateDotFormet(orderInfo?.check_in_datetime || '')} ${useTimeFormet(orderInfo?.room_info?.check_in_time || '')}`}
            checkOut={`${useDateDotFormet(orderInfo?.check_out_datetime || '')} ${useTimeFormet(orderInfo?.room_info?.check_out_time || '')}`}
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
            price={orderInfo?.total_price}
          />
        ) : (
          '결제 정보를 가져오고 있습니다.'
        )}
      </Layout>
    </div>
  );
}
