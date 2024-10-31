import { create } from 'zustand';

interface Accommodation {
  id: 0;
  name: string;
  image: string;
  address: string;
}

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

interface ManagementFilter {
  filteredData: Booking[] | null | undefined;
  setFilteredData: (data: Booking[] | null | undefined) => void;
}

const useManagementFilterStore = create<ManagementFilter>(set => ({
  filteredData: null,
  setFilteredData: data => set({ filteredData: data }),
}));

export default useManagementFilterStore;
