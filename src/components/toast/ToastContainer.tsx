import {useToastStore} from '../../store/toastStore';

export function ToastContainer() {
  const toasts = useToastStore(s => s.toasts);
  const removeToast = useToastStore(s => s.removeToast);

  return (
    <div className="fixed bottom-4 right-4 space-y-2">
      {toasts.map(t => (
        <div key={t.id} className="bg-black text-white px-4 py-2 rounded-xl animate-fade-in">
          {t.message}
        </div>
      ))}
    </div>
  );
}
