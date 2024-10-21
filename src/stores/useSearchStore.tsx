import { create } from 'zustand';
let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();
const todayDate = `${year}/${month}/${date}${day}`;
const tomorrowDate = `${year}/${month}/${date + 1}${day + 1}`;

interface State {
  search: {
    city: null | string;
    date: {
      checkIn: string;
      checkOut: string;
    };
    personnel: {
      adult: number;
      infant: number;
    };
  };
}

interface Actions {
  actions: {
    setCity: (city: string) => void;
    resetState: () => void;
  };
}
const initialState: State = {
  search: {
    city: null,
    date: {
      checkIn: todayDate,
      checkOut: tomorrowDate,
    },
    personnel: {
      adult: 1,
      infant: 0,
    },
  },
};
export const useSearchStore = create<State & Actions>(set => ({
  ...initialState,
  actions: {
    setCity: (city: string) =>
      set(state => ({
        search: {
          ...state.search,
          city: city,
        },
      })),
    resetState: () => set(() => ({ ...initialState })),
  },
}));
