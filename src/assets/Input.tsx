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
}: InputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (error) {
      setError('');
    }
  };

  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        setError(validationError);
      }
    } else if (value === '') {
      setError(errorMessage);
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
        onBlur={handleBlur}
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
      {error && <p className="text-red-500 text-sm p-0 m-0">{error}</p>}
    </div>
  );
}