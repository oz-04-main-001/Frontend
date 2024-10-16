import { useState } from 'react';

export default function Chips({ text = 'chip' }) {
  const [select, setSelected] = useState<boolean>(true);
  return (
    <a
      className={`inline-block w-full px-5 py-6 rounded-md ${select ? `text-gray-700 border-2 border-gray-100 border-solid` : `text-gray-400 bg-gray-50`}`}
      onClick={() => {
        setSelected(!select);
      }}
    >
      <h4>{text}</h4>
    </a>
  );
}
