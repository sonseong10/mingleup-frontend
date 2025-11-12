import React from 'react';
import AbsPopup, {PopupType} from './AbsPopup';
import {usePopupStore} from '../../store/popupStore';

export default function PopupComponent() {
  const {isOpen, type, props, close} = usePopupStore();

  if (!isOpen || !type || !props) return null;

  const handleConfirm = (data?: any) => {
    props.onConfirm?.(data);
    close(data);
  };

  const handleCancel = () => close(undefined);

  switch (type) {
    case 'alert':
      return (
        <AbsPopup isOpen header={props.header} body={props.body} footer={props.footer} onConfirm={handleConfirm} />
      );

    case 'confirm':
      return (
        <AbsPopup
          isOpen
          header={props.header}
          body={props.body}
          footer={props.footer}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      );

    case 'form':
      return (
        <AbsPopup isOpen header={props.header} body={props.body} footer={props.footer} onConfirm={handleConfirm} />
      );

    case 'custom':
      return (
        <AbsPopup isOpen header={props.header} body={props.body} footer={props.footer} onConfirm={handleConfirm} />
      );

    default:
      return null;
  }
}
