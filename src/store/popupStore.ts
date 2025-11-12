import {create} from 'zustand';
import {devtools} from 'zustand/middleware';

import type {PopupType, PopupProps} from '../components/popup/AbsPopup';

// type에 따라 footer 버튼 길이 제한
export type FooterFor<T extends PopupType> = T extends 'alert'
  ? {buttonText: [string]}
  : T extends 'confirm'
    ? {buttonText: [string, string]}
    : {buttonText: string[]};

export interface PopupStoreState<T extends PopupType = PopupType, TData = unknown> {
  isOpen: boolean;
  type?: T;
  props?: PopupProps<TData>;
  resolver?: (value: {ok: boolean; data?: TData}) => void;
  open: (type: T, props?: PopupProps<TData>) => Promise<{ok: boolean; data?: TData}>;
  close: (data?: TData) => void;
}

export const usePopupStore = create<PopupStoreState>()(
  devtools((set, get) => ({
    isOpen: false,
    type: undefined,
    props: undefined,
    resolver: undefined,

    open: (type, props) =>
      new Promise(resolve => {
        set({isOpen: true, type, props, resolver: resolve});
      }),

    close: data => {
      const resolver = get().resolver;
      resolver?.({ok: !!data, data});
      set({isOpen: false, type: undefined, props: undefined, resolver: undefined});
    },
  }))
);
