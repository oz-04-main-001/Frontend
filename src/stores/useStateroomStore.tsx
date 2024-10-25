import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface State {
  stateRoom: {
    id: string | null;
    accommodation_name: string;
    name: string;
    capacity: number;
    max_capacity: number;
    description: string;
    price: number | string;
    stay_type: boolean;
    check_in_time: string;
    check_out_time: string;
  };
}

interface Actions {
  actions: {
    setStateRoomInfo: (info: State) => void;
    setStateRoomId: (id: number) => void;
  };
}
const initialState: State = {
  stateRoom: {
    id: null,
    accommodation_name: '정보없음',
    name: 'candidate',
    capacity: 0,
    max_capacity: 0,
    description: '정보없음',
    price: '가격정보없음',
    stay_type: false,
    check_in_time: '정보없음',
    check_out_time: '정보없음',
  },
};
export const useStateroomStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {
        setStateRoomInfo: (info: State) =>
          set(state => ({
            stateRoom: {
              ...state.stateRoom,
              ...info,
            },
          })),
        setStateRoomId: (id: number) =>
          set(state => ({
            stateRoom: {
              ...state.stateRoom,
              stateRoom: id,
            },
          })),
      },
    }),
    { name: 'StateroomStore' }
  )
);
