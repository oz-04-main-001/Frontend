import { create } from 'zustand';

// Zustand 상태 저장소 생성
interface SelectedDateState {
  selectedDate: string | null;
  setSelectedDate: (date: string | null) => void;
}

const useSelectedDateStore = create<SelectedDateState>(set => ({
  selectedDate: null,
  setSelectedDate: date => set({ selectedDate: date }),
}));

export default useSelectedDateStore;
