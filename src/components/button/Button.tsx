import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

/**
 * 공용 Button 컴포넌트
 *
 * - width: 100% 고정
 * - 활성: 배경 #FDCEDF, 글자 #000000
 * - 비활성: 배경 #CACACA 60%, 글자 #000000 60%
 * - 폰트 크기 / 패딩 등은 className으로 화면별 커스터마이징
 */
export default function Button(props: ButtonProps) {
  const {
    children,
    className = '',
    disabled = false,
    type = 'button',
    style,
    ...rest // onClick, id, aria-*, name 등등 전부 여기로 들어옴
  } = props;

  const baseClassName =
    'w-full rounded-md text-center font-medium transition-colors duration-150 ' +
    'focus:outline-none ' +
    'cursor-pointer disabled:cursor-not-allowed';

  const finalClassName = `${baseClassName} ${className}`;

  // 기본 색상 스타일
  const stateStyle: React.CSSProperties = disabled
    ? {
        backgroundColor: 'rgba(202, 202, 202, 0.6)', // #CACACA 60%
        color: 'rgba(0, 0, 0, 0.6)', // #000000 60%
      }
    : {
        backgroundColor: '#FDCEDF',
        color: '#000000',
      };

  // 사용자 style과 merge (사용자가 추가 스타일 넣으면 반영되도록)
  const mergedStyle: React.CSSProperties = {
    ...stateStyle,
    ...style,
  };

  return (
    <button
      type={type}
      disabled={disabled}
      className={finalClassName}
      style={mergedStyle}
      {...rest} // onClick, id, aria-label 등 다 전달
    >
      {children}
    </button>
  );
}
