import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  accommodation: {
    accommodationId: number | undefined;
    hotel_img: null | string;
    name: string;
    address: string;
    min_price: number | null;
    rooms: [
      {
        accommodation_name: string;
        name: string;
        id: number | undefined;
        capacity: number;
        max_capacity: number;
        description: string;
        price: number | string;
        stay_type: true;
        check_in_time: string;
        check_out_time: string;
      },
    ];
    phone_number: string;
    description: string;
    rules: string;
    host: number | null;
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
    accommodationId: undefined,
    hotel_img: null,
    name: '숙소이름',
    address: '주소 정보없음',
    min_price: null,
    rooms: [
      {
        accommodation_name: '숙소이름',
        name: '객실이름',
        id: undefined,
        capacity: 0,
        max_capacity: 0,
        description: '객실 소개 없음',
        price: '가격정보없음',
        stay_type: true,
        check_in_time: '정보없음',
        check_out_time: '정보없음',
      },
    ],
    phone_number: '호스트 정보 없음',
    description: '숙소 정보없음',
    rules: '',
    host: null,
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
