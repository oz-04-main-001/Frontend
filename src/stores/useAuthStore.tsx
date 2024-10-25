import { create } from 'zustand';

interface AuthState {
  email: string | null; // 로그인한 사용자의 이메일
  usertype: string | null; // 로그인한 사용자의 타입 (호스트 정보)
  businessProfile: any | null; // 비즈니스 프로필 정보 (형식에 맞춰 조정 필요)
  setEmail: (email: string) => void;
  setUsertype: (usertype: string) => void; // 유저 타입 저장 함수
  setBusinessProfile: (profile: any) => void; // 비즈니스 프로필 저장 함수
  clearEmail: () => void;
  clearUsertype: () => void; // 유저 타입 초기화 함수
  clearBusinessProfile: () => void; // 비즈니스 프로필 초기화 함수
}

const useAuthStore = create<AuthState>(set => ({
  email: null, // 기본적으로 null로 초기화 (로그아웃 상태)
  usertype: null, // 기본적으로 null로 초기화
  businessProfile: null, // 기본적으로 null로 초기화
  setEmail: (email: string) => set({ email }),
  setUsertype: (usertype: string) => set({ usertype }),
  setBusinessProfile: (profile: any) => set({ businessProfile: profile }), // 비즈니스 프로필 저장
  clearEmail: () => set({ email: null }),
  clearUsertype: () => set({ usertype: null }),
  clearBusinessProfile: () => set({ businessProfile: null }), // 비즈니스 프로필 초기화
}));

export default useAuthStore;
