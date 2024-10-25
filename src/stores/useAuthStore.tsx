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
  setEmail: (email: string) => void;
  setUsertype: (usertype: string) => void;
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
  setUsertype: (usertype: string) => set({ usertype }),
  setBusinessProfile: (profile: BusinessProfile) => set({ businessProfile: profile }),
  clearEmail: () => set({ email: null }),
  clearUsertype: () => set({ usertype: null }),
  clearBusinessProfile: () => set({ businessProfile: null }),
}));

export default useAuthStore;