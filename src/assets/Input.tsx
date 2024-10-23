import React, { useState } from 'react';

// Input 컴포넌트
interface InputProps {
  type: string;
  id: string;
  placeholder: string;
  label?: string;
  width?: string;
  height?: string;
  className?: string;
  validate?: (value: string) => string | null;
  errorMessage?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void; // onBlur 속성 추가
}

export function Input({
  type,
  id,
  placeholder,
  label,
  width,
  height,
  className = '',
  validate,
  errorMessage = '이 필드는 필수입니다.',
  onChange,
  onBlur, // onBlur 인자 추가
}: InputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) {
      setError('');
    }
    if (onChange) {
      onChange(e); // onChange prop이 전달된 경우 호출
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
      }
    } else if (value === '') {
      setError(errorMessage);
    }
    
    if (onBlur) {
      onBlur(e); // onBlur prop이 전달된 경우 호출
    }
  };

  const defaultWidth = 'max-w-[600px] min-w-[170px]';
  const defaultHeight = 'h-[38px]';

  return (
    <div className="mb-4">
      {label && <label htmlFor={id} className="block mb-2 text-sm font-medium">{label}</label>}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur} // handleBlur 함수 호출
        className={`
          w-full
          ${width || defaultWidth}
          ${height || defaultHeight}
          p-2
          border
          border-basic-400
          rounded-md
          focus:outline-none
          focus:ring-2
          focus:ring-state-safe
          text-base
          font-sans
          font-regular
          ${className}
        `}
      />
      {error && <p className="p-0 m-0 text-sm text-red-500">{error}</p>}
    </div>
  );
}
