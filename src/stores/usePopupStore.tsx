import { create } from 'zustand';

interface PopupState {
  popup: boolean;
  closePopup: () => void;
}

const usePopupStore = create<PopupState>(set => ({
  popup: false,
  closePopup: () =>
    set(state => ({
      popup: !state.popup, // popup 값을 반전
    })),
}));

export default usePopupStore;
