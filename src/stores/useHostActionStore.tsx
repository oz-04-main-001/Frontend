import { create } from 'zustand';

interface ActionType {
  action: 'status' | 'accept' | 'cancelled';
  setAction: (action: 'accept' | 'cancelled') => void;
}

const useHostActionStore = create<ActionType>(set => ({
  action: 'status', // 초기 상태 설정
  setAction: action => set({ action }), // 상태 업데이트 함수
}));

export default useHostActionStore;
