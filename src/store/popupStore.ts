import {create} from 'zustand';
import {PopupOption} from '../components/popup/types/popup';

interface PopupState {
  open: boolean;
  option: PopupOption | null;
  setPopup: (option: PopupOption | null) => void;
}

export const usePopupStore = create<PopupState>(set => ({
  open: false,
  option: null,

  setPopup: option => {
    set({
      open: option !== null,
      option,
    });
  },
}));
