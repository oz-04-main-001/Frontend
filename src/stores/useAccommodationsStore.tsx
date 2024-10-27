import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export interface Amenity {
  amenity: {
    name: string;
    category: string;
    description: string;
    icon: null;
    is_custom: boolean;
  };
}
interface Accommodation {
  name: string;
  phone_number: string;
  description: string;
  rules: string;
}
interface StateRoom {
  id: number;
  name: string;
  capacity: number;
  max_capacity: number | string;
  description: string;
  price: number | string;
  check_in_time: string;
  check_out_time: string;
  bed_info: {
    total_beds: number;
    bed_names: string[];
  };
  images: string;
}

interface State {
  accommodation: {
    accommodationId: number | null;
    accommodation_img: null;
    accommodation_info: Accommodation;
    address: string;
    min_price: string | number;
    rooms: StateRoom[] | string;
    accommodation_amenity: Amenity[];
  };
}

interface Actions {
  actions: {
    setAccommodationsInfo: (info: State) => void;
    setAccommodationId: (id: number) => void;
  };
}
const initialState: State = {
  accommodation: {
    accommodationId: null,
    accommodation_img: null,
    accommodation_info: {
      name: '정보없음',
      phone_number: '정보없음',
      description: '정보없음',
      rules: '정보없음',
    },
    address: '정보없음',
    min_price: '정보없음',
    rooms: '예약 가능한 객실이 없습니다.',
    accommodation_amenity: [],
  },
};
export const useAccommodationsStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {
        setAccommodationsInfo: (info: State) =>
          set(state => ({
            accommodation: {
              ...state.accommodation,
              ...info,
            },
          })),
        setAccommodationId: (id: number) =>
          set(state => ({
            accommodation: {
              ...state.accommodation,
              accommodationId: id,
            },
          })),
      },
    }),
    { name: 'AccommodationsStore' }
  )
);
