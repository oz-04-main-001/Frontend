import { create } from 'zustand';
import client from '../axios/client';

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

interface BooklistStore {
  data: Booking[] | null;
  fetchData: (date: string | undefined) => Promise<void>;
}

const useBookingStore = create<BooklistStore>(set => ({
  data: null,
  fetchData: async date => {
    try {
      const response = await client.get(
        `api/v1/host/bookingcheck/?date=${date}`
      );
      set({ data: response.data });
    } catch (error) {
      console.error(error);
    }
  },
}));

export default useBookingStore;
