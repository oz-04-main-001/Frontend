import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  stateRoom: {
    id: number;
    accommodation: number; // 숙소 id?
    name: string;
    capacity: 2147483647; //용량?
    max_capacity: 2147483647; //용량?
    price: number;
    stay_type: boolean; // 어떤건지?
    description: string;
    check_in_time: string | null;
    check_out_time: string | null;
    is_available: boolean; // // 객실 예약 가능 여부?
    room_type: {
      is_customized: boolean; //??
      type_name: string; //??
    };
    images: [
      {
        id: number;
        image: string | null;
      },
    ];
    inventory: {
      count_room: 2147483647; //재고...?
    };
  };
}

interface Actions {
  actions: {};
}
const initialState: State = {
  stateRoom: {
    id: 0,
    accommodation: 0,
    name: '숙소이름',
    capacity: 2147483647, //용량?
    max_capacity: 2147483647, //용량?
    price: 0,
    stay_type: false, // 어떤건지?
    description: '객실 설명',
    check_in_time: null,
    check_out_time: null,
    is_available: false, // // 객실 예약 가능 여부?
    room_type: {
      is_customized: true, //??
      type_name: 's', //??
    },
    images: [
      {
        id: 0,
        image: null,
      },
    ],
    inventory: {
      count_room: 2147483647, //재고...?
    },
  },
};
export const useSearchStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {},
    }),
    { name: 'AccommodationsStore' }
  )
);
