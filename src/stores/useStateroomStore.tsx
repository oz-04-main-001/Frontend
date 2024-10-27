import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface Image {
  image: string;
}

export interface StateRoomOption {
  option: {
    name: string;
    category: string;
    is_custom: boolean;
  };
}
interface State {
  stateRoom: {
    accommodation_name: string;
    room: {
      id: number | null;
      name: string;
      capacity: number | null;
      max_capacity: number | null;
      description: string;
      price: number | string;
      check_in_time: string;
      check_out_time: string;
      bed_info: {
        total_beds: number;
        bed_names: string[];
      };
    };
    room_options: StateRoomOption[];
    images: Image[];
  };
}

interface Actions {
  actions: {
    setStateRoomInfo: (info: State) => void;
  };
}
const initialState: State = {
  stateRoom: {
    accommodation_name: '정보없음',
    room: {
      id: null,
      name: '정보없음',
      capacity: null,
      max_capacity: null,
      description: '정보없음',
      price: '정보없음',
      check_in_time: '14:00:00',
      check_out_time: '11:00:00',
      bed_info: {
        total_beds: 0,
        bed_names: [],
      },
    },
    room_options: [],
    images: [],
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
      },
    }),
    { name: 'StateroomStore' }
  )
);
