import {create} from 'zustand';

interface ToastItem {
  id: string;
  message: string;
}

interface ToastStore {
  toasts: ToastItem[];
  addToast: (message: string) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>(set => ({
  toasts: [],

  addToast: message => {
    const id = crypto.randomUUID();

    set(state => ({
      toasts: [...state.toasts, {id, message}],
    }));

    // 2초 후 자동 삭제
    setTimeout(() => {
      set(state => ({
        toasts: state.toasts.filter(t => t.id !== id),
      }));
    }, 2000);
  },

  removeToast: id =>
    set(state => ({
      toasts: state.toasts.filter(t => t.id !== id),
    })),
}));
