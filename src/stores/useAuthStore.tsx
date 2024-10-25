import { create } from 'zustand';

interface AuthState {
  email: string | null;  // 로그인한 사용자의 이메일을 저장
  setEmail: (email: string) => void;  
  clearEmail: () => void;  
}

const useAuthStore = create<AuthState>((set) => ({
  email: null,  // 기본적으로 null로 초기화 (로그아웃 상태)
  setEmail: (email: string) => set({ email }),  
  clearEmail: () => set({ email: null }),  
}));

export default useAuthStore;
