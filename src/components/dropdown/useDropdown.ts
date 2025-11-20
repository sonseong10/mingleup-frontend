import {useState, useCallback} from 'react';

interface UseDropdownOptions {
  initialValue?: string | null;
  onChange?: (value: string) => void;
}

/**
 * 드롭다운 공통 로직 훅
 *
 * - 선택된 값 상태 관리
 * - onChange 래핑
 */
export function useDropdown(options: UseDropdownOptions = {}) {
  const {initialValue = null, onChange} = options;

  const [value, setValue] = useState<string | null>(initialValue);

  const handleChange = useCallback(
    (next: string) => {
      setValue(next);
      onChange?.(next);
    },
    [onChange]
  );

  const reset = useCallback(() => {
    setValue(initialValue ?? null);
  }, [initialValue]);

  return {
    value,
    setValue: handleChange,
    reset,
    /** Dropdown에 바로 넘길 수 있는 바인딩 */
    bind: {
      value,
      onChange: handleChange,
    } as const,
  };
}
