import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
export interface SearchRoom {
  id: number;
  name: string;
  lowest_price: number | string;
  location: number[];
  representative_image: null;
  room: number[];
}
export interface KakaoRoom {
  image_url: string;
  location: number[];
  place_name: string;
  place_url: string;
  road_address_name: string;
}

interface State {
  accommodation_data: SearchRoom[] | null;
  kakao_place_data: KakaoRoom[] | null;
}

interface Actions {
  actions: {
    setSearchData: (info: State) => void;
  };
}
const initialState: State = {
  accommodation_data: null,
  kakao_place_data: null,
};
export const useSearchRoomStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {
        setSearchData: (info: State) =>
          set(() => ({
            ...initialState,
            accommodation_data: info.accommodation_data,
            kakao_place_data: info.kakao_place_data,
          })),
      },
    }),
    { name: 'SearchRoomStore' }
  )
);
