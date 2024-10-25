import { useState, useEffect } from 'react';
import client from '../axios/client';
import useSelectedDateStore from '../stores/useSelectedDateStore';

interface Booking {
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
}

const BookingListApi = () => {
  const [data, setData] = useState<Booking[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const selectedDate = useSelectedDateStore(state => state.selectedDate);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(
          `api/v1/host/bookingcheck/?date=${selectedDate}`
        );
        setData(response.data);
        console.log('API Response:', response);
      } catch (error) {
        console.error(error);
        setError('데이터를 가져오는 데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (selectedDate) {
      fetchData();
    }
  }, [selectedDate]);
  return { data, loading, error };
};

export default BookingListApi;
