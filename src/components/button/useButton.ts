import {useState, useCallback} from 'react';

interface UseButtonOptions {
  disabled?: boolean; // 외부에서 제어하는 disabled (예: 폼 검증 실패 등)
  onClick?: () => void | Promise<void>; // 버튼 클릭 시 실행할 로직 (동기/비동기 둘 다 허용)
}

/**
 * 버튼 공통 로직 훅
 *
 * - 로딩 상태 관리
 * - 비동기 onClick 처리 (중복 클릭 방지)
 */
export function useButton({disabled = false, onClick}: UseButtonOptions) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = useCallback(async () => {
    if (disabled || isLoading) return;
    if (!onClick) return;

    const result = onClick(); // result: void | Promise<void>

    if (result instanceof Promise) {
      try {
        setIsLoading(true);
        await result;
      } finally {
        setIsLoading(false);
      }
    }
  }, [disabled, isLoading, onClick]);

  return {
    isLoading,
    disabled: disabled || isLoading, // 로딩 중일 때도 disabled 처리
    handleClick,
  };
}
