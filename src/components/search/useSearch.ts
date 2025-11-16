import {useState, useCallback, ChangeEvent, KeyboardEvent} from 'react';

interface UseSearchOptions {
  initialKeyword?: string;
  disabled?: boolean;
  /**
   * 검색 실행 콜백
   * - 동기/비동기 모두 허용
   */
  onSearch?: (keyword: string) => void | Promise<void>;
}

export function useSearch(options: UseSearchOptions = {}) {
  const {initialKeyword = '', disabled = false, onSearch} = options;

  const [keyword, setKeyword] = useState(initialKeyword);
  const [isSearching, setIsSearching] = useState(false);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  }, []);

  const execSearch = useCallback(async () => {
    if (disabled || isSearching) return;
    if (!onSearch) return;

    const result = onSearch(keyword);

    if (result instanceof Promise) {
      try {
        setIsSearching(true);
        await result;
      } finally {
        setIsSearching(false);
      }
    }
  }, [disabled, isSearching, keyword, onSearch]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        execSearch();
      }
    },
    [execSearch]
  );

  const reset = useCallback(() => {
    setKeyword(initialKeyword);
  }, [initialKeyword]);

  const effectiveDisabled = disabled || isSearching;

  return {
    keyword,
    isSearching,
    disabled: effectiveDisabled,
    setKeyword,
    handleChange,
    handleKeyDown,
    execSearch,
    reset,
    /** SearchInput의 input에 바로 펼쳐 쓸 수 있는 바인딩 */
    bindInput: {
      value: keyword,
      onChange: handleChange,
      onKeyDown: handleKeyDown,
      disabled: effectiveDisabled,
    } as const,
  };
}
