import React, { useState } from 'react';

interface CounterProps {
    size?: number; 
}

const Counter: React.FC<CounterProps> = ({ size = 24 }) => {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => {
        if (count > 0) {
            setCount(count - 1);
        }
    };

    const buttonPadding = size * 0.5; 
    const buttonSize = `${size + buttonPadding * 2}px`; 
    const textSize = `${size}px`; 

    return (
        <div className="flex items-center justify-center space-x-4">
            <button
                onClick={decrement}
                className="flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg shadow-md"
                style={{ width: buttonSize, height: buttonSize }}
            >
                <span className="text-gray-600" style={{ fontSize: textSize }}>−</span> {/* 텍스트 크기 조정 */}
            </button>

            <span className="font-bold" style={{ fontSize: textSize }}>{count}</span>
            <button
                onClick={increment}
                className="flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg shadow-md"
                style={{ width: buttonSize, height: buttonSize }} 
            >
                <span className="text-gray-600" style={{ fontSize: textSize }}>+</span> {/* 텍스트 크기 조정 */}
            </button>
        </div>
    );
};

export default Counter;
