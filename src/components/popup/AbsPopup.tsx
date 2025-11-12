import React, {Activity, type JSX, useRef} from 'react';
import {X} from 'lucide-react';

/**
 * 팝업의 종류를 정의합니다.
 * - 'alert' : 확인 버튼 1개
 * - 'confirm' : 확인/취소 버튼 2개
 * - 'custom' : 이미지, 텍스트 등 자유형 컨텐츠
 * - 'form' : 사용자 입력을 받아야 하는 폼
 */
export type PopupType = 'alert' | 'confirm' | 'custom' | 'form';

/**
 * AbsPopup 컴포넌트의 props
 * @interface
 * @property {boolean} [isOpen] - 팝업이 열려있는지 여부
 * @property {PopupType} [type] - 팝업 타입
 * @property {{title: string}} header - 팝업 헤더 정보
 * @property {React.ReactNode} body - 팝업 본문 내용 (JSX)
 * @property {{buttonText: string[]}} footer - 버튼 텍스트 배열
 * @property {(data?: Record<string, any>) => void} [onConfirm] - 확인 버튼 클릭 시 콜백, body 내 input 값을 포함한 객체 반환
 * @property {() => void} [onCancel] - 팝업 외부 클릭 또는 닫기 버튼 클릭 시 호출되는 콜백
 */
export interface PopupProps<TData = Record<string, any>> {
  isOpen?: boolean;
  type?: PopupType;
  header: {title: string};
  body: React.ReactNode;
  footer: {buttonText: string[]};
  onConfirm?: (data?: TData) => void;
  onCancel?: () => void;
}

/**
 * 범용 팝업 컴포넌트
 *
 * - `isOpen`이 true일 때 화면 중앙에 표시됩니다.
 * - `body`에 포함된 input, textarea, select 요소의 값은 확인 버튼 클릭 시 `onConfirm` 콜백에 전달됩니다.
 * - 외부 클릭 또는 X 버튼 클릭 시 `onCancel` 콜백이 호출됩니다.
 *
 * @param {PopupProps} props - 팝업 설정
 * @returns {JSX.Element | null} - 팝업 JSX 또는 null
 */

export default function AbsPopup({isOpen, header, body, footer, onConfirm, onCancel}: PopupProps): JSX.Element | null {
  const containerRef = useRef<HTMLDivElement>(null);

  const isLast = (arr: any[], idx: number) => idx === arr.length - 1;

  const handleConfirm = () => {
    const data: Record<string, any> = {};

    if (containerRef.current) {
      const inputs = containerRef.current.querySelectorAll<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>(
        'input[id], textarea[id], select[id]'
      );

      inputs.forEach(el => {
        if (el instanceof HTMLInputElement) {
          if (el.type === 'checkbox') data[el.id] = el.checked;
          else if (el.type === 'radio' && el.checked) data[el.id] = el.value;
          else data[el.id] = el.value;
        } else if (el instanceof HTMLTextAreaElement || el instanceof HTMLSelectElement) {
          data[el.id] = el.value;
        }
      });
    }

    // TODO: 사용자 키보드 enter 사용시 이벤트 연결
    // TODO: header, body, footer 컴포넌트 분리 작업 - 반환 할 상태는 zustand에서 관리
    onConfirm?.(data);
  };

  return (
    <Activity mode={!isOpen ? 'hidden' : 'visible'}>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
        onClick={onCancel}
      >
        <div
          ref={containerRef}
          className="w-full max-w-lg mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-6"
          onClick={e => e.stopPropagation()}
        >
          <header className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">{header.title}</h2>
            <button onClick={onCancel}>
              <X className="w-5 h-5" />
            </button>
          </header>

          <div className="mb-4">{body}</div>

          <div className="flex justify-end gap-2">
            {footer.buttonText.map((text, index) =>
              isLast(footer.buttonText, index) ? (
                <button key={index} className="px-4 py-2 bg-blue-600 text-white rounded-lg" onClick={handleConfirm}>
                  {text}
                </button>
              ) : (
                <button key={index} className="px-4 py-2 bg-white text-black" onClick={onCancel}>
                  {text}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </Activity>
  );
}
