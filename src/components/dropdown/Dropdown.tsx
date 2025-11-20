import React, {useState} from 'react';
import ExpandingIcon from '../../assets/ic_expanding.svg';
import ExpandedIcon from '../../assets/ic_expanded.svg';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  options: DropdownOption[];
  placeholder?: string;
  value?: string | null;
  onChange?: (value: string) => void;
  disabled?: boolean;

  /** 드롭다운 전체 래퍼에 줄 className (width, margin 등) */
  wrapperClassName?: string;
  /** 닫힌 상태 박스(버튼)에 줄 className (내부 padding, width 등) */
  buttonClassName?: string;
  /** 옵션 목록 전체 컨테이너 className (간격, 위치 조정 등) */
  optionListClassName?: string;
  /** 각 옵션 아이템 className (padding, width 등) */
  optionClassName?: string;
}

/**
 * 공용 Dropdown 컴포넌트
 *
 * - 텍스트 크기: 16px
 * - placeholder 색: #838383
 * - 선택 텍스트 색: #000000
 * - 닫힌 박스 / 옵션 박스 모두 border-radius: 20px
 * - 옵션 아이템 border-radius: 15px
 * - width / padding은 className으로 페이지에서 조절 가능
 */
export default function Dropdown({
  options,
  placeholder = '선택 없음',
  value = null,
  onChange,
  disabled = false,
  wrapperClassName = '',
  buttonClassName = '',
  optionListClassName = '',
  optionClassName = '',
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.value === value) ?? null;

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(prev => !prev);
  };

  const handleSelect = (val: string) => {
    if (disabled) return;
    onChange?.(val);
    setIsOpen(false);
  };

  const textClassName = selectedOption ? 'text-[#000000]' : 'text-[#838383]';

  return (
    <div className={`relative ${wrapperClassName}`}>
      {/* 닫힌 상태 박스 */}
      <button
        type="button"
        disabled={disabled}
        onClick={handleToggle}
        className={[
          'flex items-center justify-between',
          isOpen ? 'border border-[#F2BED1]' : 'border border-[#838383]',
          'rounded-[20px]',
          'bg-white',
          'text-[16px]',
          'px-[25px] py-[20px]',
          disabled ? 'cursor-not-allowed' : 'cursor-pointer',
          buttonClassName, // padding / width는 여기에서 조절
        ].join(' ')}
      >
        <span className={textClassName}>{selectedOption ? selectedOption.label : placeholder}</span>

        <img
          src={isOpen ? ExpandingIcon : ExpandedIcon} // 열리면 Expanding, 닫히면 Expanded
          alt="드롭다운 상태 아이콘"
          className="w-5 h-5 ml-2" // 20px = 5 * 4px
        />
      </button>

      {/* 옵션 목록 */}
      {isOpen && (
        <div
          className={[
            'absolute left-0 mt-2 z-10',
            'w-full',
            'border border-[#D8D8D8]',
            'rounded-[20px]',
            'bg-white',
            'px-[20px] py-[20px]',
            'flex flex-col',
            'max-h-[274px]',
            'overflow-y-auto',
            optionListClassName,
          ].join(' ')}
        >
          {options.map(opt => (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              className={[
                'w-full',
                'text-center',
                'text-[16px] text-[#000000]',
                'py-[10px] px-3',
                'rounded-[15px]',
                'hover:bg-[#F8E8EE]',
                'm-0',
                optionClassName,
              ].join(' ')}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
