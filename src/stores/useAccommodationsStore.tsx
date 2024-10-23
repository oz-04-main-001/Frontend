import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  accommodation: {
    hotel_img: string | null;
    name: string;
    address: string;
    min_price: string;
    rooms: string;
    phone_number: string;
    description: string;
    rules: string;
  };
}

interface Actions {
  actions: {};
}
const initialState: State = {
  accommodation: {
    hotel_img: null,
    name: '숙소',
    address: '주소',
    min_price: '최저가격',
    rooms: '방 가격', //이건 뭐지..?
    phone_number: '010-1234-5678',
    description: '숙소 설명',
    rules: '숙소 이용 규칙',
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
