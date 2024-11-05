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
  setAccessToken: (token: string) => void;
  clearAuth: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  email: localStorage.getItem('email') || null,
  usertype: localStorage.getItem('usertype') || null,
  businessProfile: null,
  accessToken: localStorage.getItem('accessToken') || null,
  setEmail: (email: string) => {
    localStorage.setItem('email', email);
    set({ email });
  },
  setUsertype: (usertype: string) => {
    localStorage.setItem('usertype', usertype);
    set({ usertype });
  },
  setBusinessProfile: (profile: BusinessProfile) => set({ businessProfile: profile }),
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },
  clearAuth: () => {
    localStorage.removeItem('email');
    localStorage.removeItem('usertype');
    localStorage.removeItem('accessToken');
    set({ email: null, usertype: null, accessToken: null, businessProfile: null });
  },
}));

export default useAuthStore;
