import {usePopupStore} from '../../store/popupStore';
import type {PopupType, PopupProps} from './AbsPopup';
import type {FooterFor} from '../../store/popupStore';

/**
 * usePopup 훅
 */
export function usePopup(): {
  openPopup: <T extends PopupType, R = unknown>(
    type: T,
    props: PopupProps<R> & {footer: FooterFor<T>}
  ) => Promise<{ok: boolean; data?: R}>;
  closePopup: <R = unknown>(data?: R) => void;
} {
  const {open, close} = usePopupStore();

  function openPopup<T extends PopupType, R = unknown>(type: T, props: PopupProps<R> & {footer: FooterFor<T>}) {
    return open(type, props as unknown as PopupProps<unknown>) as Promise<{ok: boolean; data?: R}>;
  }

  function closePopup<R = unknown>(data?: R) {
    close(data as unknown);
  }

  return {openPopup, closePopup};
}
