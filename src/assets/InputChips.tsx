import { useState } from 'react';

interface InputChipsProps {
    text?: string;
    className?: string;
    value?: string | undefined;
    setValue?: (value: string) => void;
    editable?: boolean;
    onKeyPress?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    placeholder?: string;
}

export default function InputChips({
    text = '', 
    className = '',
    setValue,
    value,
    editable = false,
    onKeyPress,
    placeholder = '',
}: InputChipsProps) {
    const [select, setSelected] = useState<boolean>(true);

    return (
        <a
            className={"inline-block w-full rounded-md ${select ? 'text-gray-700 border-2 border-gray-100 border-solid' : 'text-gray-400 bg-gray-50'} ${className} flex items-center justify-center"}
            onClick={() => {
                setSelected(!select);
            }}
        >
            {editable ? (
                <input
                    className={"w-full bg-inherit text-sm text-gray-400 px-5 py-6 bg-transparent focus:outline-none border-none text-center"}
                    value={value} 
                    placeholder={placeholder}
                    onChange={(e) => {
                        if (setValue) {
                            setValue(e.target.value);
                        }
                    }}
                    onKeyPress={onKeyPress}
                />
            ) : (
                <span className="w-full px-5 py-6 text-sm text-center text-gray-700">
                    {text || placeholder}
                </span>
            )}
        </a>
    );
}