import { create } from 'zustand';

interface useSelectedId {
  selectedId: number | null;
  setSelectedId: (id: number | null) => void;
}
const useSelectedIdStore = create<useSelectedId>(set => ({
  selectedId: null,
  setSelectedId: id => set({ selectedId: id }), // id를 사용하여 상태 업데이트
}));

export default useSelectedIdStore;
