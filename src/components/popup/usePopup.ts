import {ReactNode} from 'react';
import {usePopupStore} from '../../store/popupStore';
import {AlertPopup, ConfirmPopup, CustomPopup, FormPopup, PopupOption} from './types/popup';

export function usePopup() {
  const setPopup = usePopupStore(s => s.setPopup);

  return {
    // Alert dialog
    alert: (option: Omit<AlertPopup, 'type'>) => setPopup({...option, type: 'alert'}),

    // Confirm dialog
    confirm: (option: Omit<ConfirmPopup, 'type'>) => setPopup({...option, type: 'confirm'}),

    // Form dialog
    form<T>(option: Omit<FormPopup<T>, 'type'>) {
      const popup: FormPopup<T> = {
        ...option,
        type: 'form',
      };
      setPopup(popup);
    },

    // Custom UI
    custom: (node: ReactNode) => {
      const popup: CustomPopup = {
        type: 'custom',
        node,
      };
      setPopup(popup);
    },

    // Close
    close: () => setPopup(null as PopupOption | null),
  };
}
