import {useState, useCallback, ChangeEvent} from 'react';

interface UseInputOptions {
  initialValue?: string;
  disabled?: boolean;
  /**
   * 유효성 검사 함수
   * - 에러가 없으면 null 반환
   * - 에러가 있으면 에러 메시지 문자열 반환
   */
  validate?: (value: string) => string | null;
  /** 값이 변할 때 추가로 실행할 콜백 (optional) */
  onChange?: (value: string) => void;
}

/**
 * 인풋 공통 로직 훅
 *
 * - value 상태 관리
 * - disabled 플래그 관리
 * - validate 로직 (선택)
 */
export function useInput(options: UseInputOptions = {}) {
  const {initialValue = '', disabled = false, validate, onChange} = options;

  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState<string | null>(null);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const nextValue = e.target.value;
      setValue(nextValue);

      if (validate) {
        const validationResult = validate(nextValue);
        setError(validationResult);
      }

      if (onChange) {
        onChange(nextValue);
      }
    },
    [validate, onChange]
  );

  const reset = useCallback(() => {
    setValue(initialValue);
    if (validate) {
      const validationResult = validate(initialValue);
      setError(validationResult);
    } else {
      setError(null);
    }
  }, [initialValue, validate]);

  return {
    value,
    disabled,
    error,
    isValid: !error,
    handleChange,
    reset,
    /** Input / textarea에 바로 바인딩해서 쓸 수 있는 props */
    bind: {
      value,
      onChange: handleChange,
      disabled,
    } as const,
  };
}
