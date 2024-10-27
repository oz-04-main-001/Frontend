import { create } from 'zustand';

interface PopupState {
  openPopup: any;
  popup: boolean;
  closePopup: () => void;
}

const usePopupStore = create<PopupState>(set => ({
  popup: false,
  openPopup: () =>
    set(_ => ({
      popup: true, // popup 값을 반전
    })),
  closePopup: () =>
    set(_ => ({
      popup: false, // popup 값을 반전
    })),
}));

export default usePopupStore;
