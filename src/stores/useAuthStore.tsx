import { create } from 'zustand';

interface BusinessProfile {
  name: string;
  address: string;
  phone: string;
}

interface AuthState {
  email: string | null;
  usertype: string | null;
  businessProfile: BusinessProfile | null;
  accessToken: string | null; 
  setEmail: (email: string) => void;
  setUsertype: (usertype: string) => void;
  setBusinessProfile: (profile: BusinessProfile) => void;
  setAccessToken: (token: string) => void; // 액세스 토큰 설정 메소드
  clearAuth: () => void; // 액세스 토큰 및 사용자 유형 초기화
}

const useAuthStore = create<AuthState>(set => ({
  email: null,
  usertype: null,
  businessProfile: null,
  accessToken: null, // 초기값 설정
  setEmail: (email: string) => set({ email }),
  setUsertype: (usertype: string) => set({ usertype }),
  setBusinessProfile: (profile: BusinessProfile) => set({ businessProfile: profile }),
  setAccessToken: (token: string) => set({ accessToken: token }), 
  clearAuth: () => set({ accessToken: null, usertype: null, email: null, businessProfile: null }), // 모든 상태 초기화
}));

export default useAuthStore;
