import React from 'react';

type SingleLineProps = {
  multiline?: false; // 기본: single line
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

type MultiLineProps = {
  multiline: true; // true일 때 textarea로 렌더링
  className?: string;
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export type InputProps = SingleLineProps | MultiLineProps;

/**
 * 공용 Input 컴포넌트
 *
 * - width: 100% 고정
 * - border: 1px solid #D9D9D9
 * - border-radius: 20px
 * - 배경색: #FFFFFF
 * - placeholder 색: #838383
 * - 입력 텍스트 색: #000000
 * - 패딩 / 폰트 크기는 className으로 화면별 커스터마이징
 * - multiline 여부에 따라 <input> / <textarea> 렌더
 */
export default function Input(props: InputProps) {
  const {className = '', multiline, style, ...rest} = props;

  const baseClassName =
    'w-full border border-[#D9D9D9] rounded-[20px] ' +
    'bg-[#FFFFFF] text-[#000000] placeholder:text-[#838383] ' +
    'focus:outline-none';

  const finalClassName = `${baseClassName} ${className}`;

  const mergedStyle: React.CSSProperties = {
    ...style,
  };

  if (multiline) {
    const textareaProps = rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>;
    return <textarea className={`${finalClassName} resize-none`} style={mergedStyle} {...textareaProps} />;
  }

  const inputProps = rest as React.InputHTMLAttributes<HTMLInputElement>;
  return <input className={finalClassName} style={mergedStyle} {...inputProps} />;
}
