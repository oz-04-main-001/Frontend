import { useEffect, useState } from 'react';
import client from './client';
import useHostActionStore from '../stores/useHostActionStore';

interface responseDataType {
  id: number;
  guest: number;
  room: number;
  check_in_datetime: string;
  check_out_datetime: string;
  total_price: number;
  status: string;
  request: string;
  guests_count: number;
  guest_name: string;
  accommodation_name: string;
  room_name: string;
  booker_name: string;
  booker_phone_number: string;
}

const ManagementRequestAPI = (bookingId: number | null) => {
  const [requestData, setRequestData] = useState<responseDataType | null>(null);
  const [isRequested, setIsRequested] = useState<boolean>(false);

  const { action } = useHostActionStore();

  const patchRequestData = async () => {
    if (bookingId && action !== 'status') {
      setIsRequested(true);
      try {
        const response = await client.patch(`/api/v1/host/requestcheck/`, {
          booking_id: bookingId,
          action,
        });
        setRequestData(response.data);
      } catch (error) {
        console.error('ManagementRequestAPI', error);
      } finally {
        console.log('requestData', requestData);
      }
    }
  };

  useEffect(() => {
    if ((action === 'cancelled' || action === 'accept') && bookingId) {
      patchRequestData();
    }
  }, [action, bookingId]);

  return { requestData, isRequested };
};

export default ManagementRequestAPI;
