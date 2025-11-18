import {ReactNode} from 'react';

export type PopupType = 'alert' | 'confirm' | 'form' | 'custom';

export interface PopupBase {
  type: PopupType;
  header?: {
    title?: string;
    close?: boolean;
  };
}

export interface AlertPopup extends PopupBase {
  type: 'alert';
  message: string | ReactNode;
}

export interface ConfirmPopup extends PopupBase {
  type: 'confirm';
  message: ReactNode;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export interface FormPopup<T = unknown> extends PopupBase {
  type: 'form';
  form: ReactNode;
  onSubmit?: (data: T) => void;
}

export interface CustomPopup extends PopupBase {
  type: 'custom';
  node: ReactNode;
}

// PopupOption에서 FormPopup만 제네릭 유지
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PopupOption = AlertPopup | ConfirmPopup | CustomPopup | FormPopup<any>;
