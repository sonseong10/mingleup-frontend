import React from 'react';
import SearchIcon from '../../assets/ic_search.svg';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string; // 전체 컨테이너에 추가로 줄 className
  inputClassName?: string; // 실제 input에 추가로 줄 className (font-size, padding 등)
}

/**
 * 검색창 컴포넌트
 *
 * - border-radius 12px, border #838383 1px, width 359px, padding 12px 19px
 * - 17.42px 정사각형 아이콘
 * - font-size 13px, placeholder "검색어를 입력해주세요"
 */
export default function SearchInput(props: SearchInputProps) {
  const {wrapperClassName = '', inputClassName = '', placeholder, ...inputProps} = props;

  const containerClassName =
    'flex items-center gap-[11px] ' + // 수평/수직 가운데 + 간격 11px
    'w-[359px] border border-[#838383] ' + // width + border
    'rounded-[100px] px-[19px] py-[12px] ' + // border-radius + padding
    'bg-white';

  const finalWrapperClassName = `${containerClassName} ${wrapperClassName}`;

  const inputBaseClassName =
    'flex-1 bg-transparent ' + // 남은 폭 전부 차지 + 배경 투명
    'text-[13px] text-[#000000] ' + // 입력 텍스트 스타일
    'placeholder:text-[#CACACA] ' + // placeholder 스타일
    'focus:outline-none';

  const finalInputClassName = `${inputBaseClassName} ${inputClassName}`;

  return (
    <div className={finalWrapperClassName}>
      {/* 고정 검색 아이콘 */}
      <span className="flex items-center justify-center w-[17.42px] h-[17.42px]">
        <img src={SearchIcon} alt="검색" className="w-[17.42px] h-[17.42px]" />
      </span>

      {/* 텍스트 입력 */}
      <input
        type="text"
        placeholder={placeholder ?? '검색어를 입력해주세요'}
        className={finalInputClassName}
        {...inputProps}
      />
    </div>
  );
}
