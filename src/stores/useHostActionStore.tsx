import { create } from 'zustand';

interface ActionType {
  action: 'none' | 'accept' | 'cancelled' | 'cancel';
  setAction: (action: 'none' | 'accept' | 'cancelled' | 'cancel') => void;
}

const useHostActionStore = create<ActionType>(set => ({
  action: 'none', // 초기 상태 설정
  setAction: action => set({ action }), // 상태 업데이트 함수
}));

export default useHostActionStore;
