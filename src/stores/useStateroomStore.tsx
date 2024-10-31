import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
interface Image {
  image: string;
}

export interface StateRoomOption {
  name: string;
  category: string;
  is_custom: boolean;
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
      price: string;
      check_in_time: string;
      check_out_time: string;
      bed_info: {
        total_beds: number;
        bed_names: string[];
      };
      room_count: number;
    };
    room_options: StateRoomOption[];
    images: Image[];
  };
}

interface Actions {
  actions: {
    setStateRoomInfo: (info: State['stateRoom']) => void;
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
      check_in_time: '정보없음',
      check_out_time: '정보없음',
      bed_info: {
        total_beds: 0,
        bed_names: [],
      },
      room_count: 0,
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
        setStateRoomInfo: (info: State['stateRoom']) =>
          set(() => ({
            ...initialState,
            stateRoom: info,
          })),
      },
    }),
    { name: 'StateroomStore' }
  )
);
