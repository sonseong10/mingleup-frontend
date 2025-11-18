import {createPortal} from 'react-dom';
import {usePopupStore} from '../../store/popupStore';
import Button from '../button/Button';

export default function Popup() {
  const {open, option, setPopup} = usePopupStore();

  const close = () => setPopup(null);

  const randerPopup = () => {
    switch (option?.type) {
      case 'alert':
        return (
          <>
            <div className="text-gray-700">{option.message}</div>
            <Button className="mt-6 py-2 " onClick={close}>
              확인
            </Button>
          </>
        );
      case 'confirm':
        return (
          <>
            <div className="text-gray-700">{option.message}</div>
            <div className="mt-6 flex justify-end gap-2">
              <button className="px-3 py-2 w-full cursor-pointer" onClick={close}>
                취소
              </button>
              <Button
                onClick={() => {
                  option.onConfirm?.();
                  close();
                }}
              >
                확인
              </Button>
            </div>
          </>
        );
      case 'form':
        return (
          <form
            onSubmit={e => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              option.onSubmit?.(Object.fromEntries(data));
              close();
            }}
          >
            {option.form}

            <Button type="submit" className="mt-6 h-11">
              다음
            </Button>
          </form>
        );
      case 'custom':
        return <>{option.node}</>;
      default:
        return <></>;
    }
  };

  if (!open || !option) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={close}>
      <div className="relative w-[380px] rounded-xl bg-white p-6 shadow-lg" onClick={e => e.stopPropagation()}>
        <header className="flex items-center justify-between mb-4">
          {option?.header?.title && <h2 className="flex-1 text-center text-lg">{option.header.title}</h2>}
          {option?.header?.close && (
            <button className="absolute right-6 box-border w-12 p-2 cursor-pointer" onClick={close}>
              X
            </button>
          )}
        </header>

        {/* Case by type */}
        {randerPopup()}
      </div>
    </div>,
    document.body
  );
}
