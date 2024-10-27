import { create } from 'zustand';

interface BusinessProfile {
  name: string;   
  address: string; 
  phone: string;   
}

interface AuthState {
  email: string | null;
  usertype: 'guest' | 'host' | null; // usertype 제한
  businessProfile: BusinessProfile | null;
  setEmail: (email: string) => void;
  setUsertype: (usertype: 'guest' | 'host') => void; // usertype 제한
  setBusinessProfile: (profile: BusinessProfile) => void;
  clearEmail: () => void;
  clearUsertype: () => void;
  clearBusinessProfile: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  email: null,
  usertype: null,
  businessProfile: null,
  setEmail: (email: string) => set({ email }),
  setUsertype: (usertype: 'guest' | 'host') => set({ usertype }), // usertype 제한
  setBusinessProfile: (profile: BusinessProfile) => set({ businessProfile: profile }),
  clearEmail: () => set({ email: null }),
  clearUsertype: () => set({ usertype: null }),
  clearBusinessProfile: () => set({ businessProfile: null }),
}));

export default useAuthStore;
