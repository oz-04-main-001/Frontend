import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export interface Amenity {
  name: string;
  category: string;
  description: string;
  icon: null;
  is_custom: boolean;
}
interface Accommodation {
  accommodation_img: null | string;
  accommodation_info: {
    name: string;
    phone_number: string;
    description: string;
    rules: string;
  };
  address: string;
  min_price: string | number;
  accommodation_amenity: Amenity[];
  refund_policy: [
    {
      seven_days_before: string;
      five_days_before: string;
      three_days_before: string;
      one_day_before: string;
      same_day: string;
    },
  ];
  accommodation_type: [
    {
      accommodation: number;
      is_customized: boolean;
      type_name: string;
    },
  ];
}
interface StateRoom {
  id: number;
  name: string;
  capacity: number;
  max_capacity: number;
  price: string | number;
  is_available: boolean;
  representative_image: string;
  check_in_time: string;
  check_out_time: string;
}

interface State {
  accommodationId: number;
  data: Data;
}

interface Actions {
  actions: {
    setAccommodationsInfo: (id: number, info: Data) => void;
  };
}

interface Data {
  accommodation: Accommodation;
  available_rooms: StateRoom[];
  unavailable_rooms: StateRoom[];
}
const initialState: State = {
  accommodationId: 0,
  data: {
    accommodation: {
      accommodation_img: null,
      accommodation_info: {
        name: '',
        phone_number: '',
        description: '',
        rules: '',
      },
      address: '',
      min_price: '',
      accommodation_amenity: [],
      refund_policy: [
        {
          seven_days_before: '',
          five_days_before: '',
          three_days_before: '',
          one_day_before: '',
          same_day: '',
        },
      ],
      accommodation_type: [
        {
          accommodation: 0,
          is_customized: false,
          type_name: '',
        },
      ],
    },
    available_rooms: [],
    unavailable_rooms: [],
  },
};
export const useAccommodationsStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {
        ...initialState,
        setAccommodationsInfo: (id: number, info: Data) =>
          set(() => ({
            ...initialState,
            accommodationId: id,
            data: info,
          })),
      },
    }),
    { name: 'AccommodationsStore' }
  )
);
