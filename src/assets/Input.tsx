import React, { useState } from 'react';

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
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
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
  value = '',
  onChange,
  onBlur,
}: InputProps) {
  const [internalValue, setInternalValue] = useState(value);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setInternalValue(newValue);
    if (onChange) {
      onChange(e);
    }
    if (error) {
      setError('');
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (validate) {
      const validationError = validate(internalValue);
      if (validationError) {
        setError(validationError);
      }
    } else if (internalValue === '') {
      setError(errorMessage);
    }
    if (onBlur) {
      onBlur(e);
    }
  };

  const defaultWidth = 'max-w-[600px] min-w-[170px]';
  const defaultHeight = 'h-[38px]';

  return (
    <div className="mb-4">
      {label && (
        <label htmlFor={id} className="block mb-2 text-sm font-medium">
          {label}
        </label>
      )}
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={internalValue}
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
      {error && <p className="p-0 m-0 text-sm text-red-500">{error}</p>}
    </div>
  );
}
