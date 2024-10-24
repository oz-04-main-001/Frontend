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
            className={`inline-block w-full rounded-md ${select ? 'text-gray-700 border-2 border-gray-100 border-solid' : 'text-gray-400 bg-gray-50'} ${className} flex items-center justify-center`} // flexbox로 수직 및 수평 가운데 정렬
            onClick={() => {
                setSelected(!select);
            }}
        >
            <input
                className={`w-full bg-inherit text-sm text-gray-400 px-5 py-6 bg-transparent focus:outline-none border-none text-center`} // text-center로 텍스트를 수평 중앙 정렬
                value={value ? value : ''} 
                placeholder={editable ? placeholder : ''}  
                onChange={(e) => {
                    if (setValue) {
                        setValue(e.target.value); 
                    }
                }}
                onKeyPress={onKeyPress}
                readOnly={!editable}  
            />
        </a>
    );
}
