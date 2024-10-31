import React from 'react';

interface CounterProps {
    size?: number;
    value: number; 
    onChange: (newValue: number) => void; 
}

const Counter: React.FC<CounterProps> = ({ size = 24, value, onChange }) => {
    const increment = () => onChange(value + 1);
    const decrement = () => {
        if (value > 0) {
            onChange(value - 1);
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
                <span className="text-gray-600" style={{ fontSize: textSize }}>−</span>
            </button>

            <span className="font-bold" style={{ fontSize: textSize }}>{value}</span>

            <button
                onClick={increment}
                className="flex items-center justify-center bg-white border-2 border-gray-300 rounded-lg shadow-md"
                style={{ width: buttonSize, height: buttonSize }}
            >
                <span className="text-gray-600" style={{ fontSize: textSize }}>+</span>
            </button>
        </div>
    );
};

export default Counter;
