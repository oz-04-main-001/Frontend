import React, { useState } from 'react';

interface InputProps {
  type: string;
  id: string;
  placeholder: string;
}

export function Input(props: InputProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // 입력값이 변경될 때 에러 메시지를 초기화합니다.
    if (error) {
      setError('');
    }
  };

  const handleBlur = () => {
    // 입력 필드가 포커스를 잃었을 때 유효성 검사
    if (value === '') {
      setError('이 필드는 필수입니다.'); // 빈 입력 시 에러 메시지 설정
    }
  };

  return (
    <div className="mb-4">
      <input
        type={props.type}
        id={props.id}
        placeholder={props.placeholder}
        value={value}
        onChange={handleChange} // 입력 값 변경 시 처리
        onBlur={handleBlur} // 포커스가 벗어났을 때 처리
        className="
          w-full
          max-w-[600px]
          min-w-[300px]
          h-[38px]
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
        "
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>} {/* 에러 메시지 표시 */}
    </div>
  );
}

export default Input;