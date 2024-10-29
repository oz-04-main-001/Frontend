import { create } from 'zustand';

interface HostAccomoDelete {
  isAccommoDeleted: true | false;
  setIsAccommoDeleted: (clicked: true | false) => void;
}

const useHostAccommoDeleteStore = create<HostAccomoDelete>(set => ({
  isAccommoDeleted: false,
  setIsAccommoDeleted: clicked => set({ isAccommoDeleted: clicked }),
}));

export default useHostAccommoDeleteStore;
