import { useState } from 'react';

interface ChipsProps {
  text: string;
  className?: string;
}

export default function Chips({ text = 'chip', className = '' }: ChipsProps) {
  const [select, setSelected] = useState<boolean>(true);

  return (
    <a
      className={`inline-block w-full px-5 py-6 rounded-md ${select ? 'text-gray-700 border-2 border-gray-100 border-solid' : 'text-gray-400 bg-gray-50'} ${className}`} 
      onClick={() => {
        setSelected(!select);
      }}
    >
      <h4 className="text-sm text-gray-400">{text}</h4> {/* 글자 크기 작게, 색상 gray-400으로 변경 */}
    </a>
  );
}

