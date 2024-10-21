import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

let today = new Date();

let year = today.getFullYear();
let month = today.getMonth() + 1;
let date = today.getDate();
let day = today.getDay();
const todayDate = `${year}/${month}/${date}${day}`;
const tomorrowDate = `${year}/${month}/${date + 1}${day + 1}`;

interface State {
  search: {
    city: string | null;
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
    setCheckIn: (time: Date) => void;
    setCheckOut: (time: Date) => void;
    setAdult: (adult: number) => void;
    setInfant: (infant: number) => void;
    resetState: () => void;
    setAdultDecrease: () => void;
    setAdultIncrease: () => void;
    setInfantDecrease: () => void;
    setInfantIncrease: () => void;
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
export const useSearchStore = create<State & Actions>()(
  devtools(
    set => ({
      ...initialState,
      actions: {
        setCity: (city: string) =>
          set(state => ({
            search: {
              ...state.search,
              city,
            },
          })),
        setCheckIn: (checkIn: Date) =>
          set(state => ({
            search: {
              ...state.search,
              checkIn,
            },
          })),
        setCheckOut: (checkOut: Date) =>
          set(state => ({
            search: {
              ...state.search,
              checkOut,
            },
          })),
        setAdult: (adult: number) =>
          set(state => ({
            search: {
              ...state.search,
              adult,
            },
          })),
        setInfant: (infant: number) =>
          set(state => ({
            search: {
              ...state.search,
              infant,
            },
          })),
        setAdultDecrease: () =>
          set(state => ({
            search: {
              ...state.search,
              personnel: {
                ...state.search.personnel,
                adult: state.search.personnel.adult - 1,
              },
            },
          })),
        setAdultIncrease: () =>
          set(state => ({
            search: {
              ...state.search,
              personnel: {
                ...state.search.personnel,
                adult: state.search.personnel.adult + 1,
              },
            },
          })),
        setInfantIncrease: () =>
          set(state => ({
            search: {
              ...state.search,
              personnel: {
                ...state.search.personnel,
                infant: state.search.personnel.infant + 1,
              },
            },
          })),
        setInfantDecrease: () =>
          set(state => ({
            search: {
              ...state.search,
              personnel: {
                ...state.search.personnel,
                infant: state.search.personnel.infant - 1,
              },
            },
          })),

        resetState: () => set(() => ({ ...initialState })),
      },
    }),
    { name: 'SearchStore' }
  )
);
