import { useState, useEffect } from 'react';
import client from '../axios/client';
import useSelectedDateStore from '../stores/useSelectedDateStore';
import axios from 'axios';
import useManagementFilterStore from '../stores/useManagementFilterStore';

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
  // const { filteredData, setFilteredData } = useManagementFilterStore();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(
          `api/v1/host/bookingcheck/?date=${selectedDate}`
        );
        setData(response.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage = error.response.data.errors;
          console.error('Error message:', errorMessage);
          setError(errorMessage);
        } else {
          console.error('Unexpected error:', error);
          setError('Unexpected error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    console.log(selectedDate);
    console.log('data', data);
  }, [selectedDate]);
  return { data, error, loading };
};

export default BookingListApi;
