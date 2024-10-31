//숙소 이용
import React, { useEffect, useState } from 'react';
import { Input } from '../../../../assets/Input';
import InputChips from '../../../../assets/InputChips';

interface AccommodationUseProps {
    initialAmenities: string[];
    onStateChange: (data: { amenities: string[]; rules: string }) => void;
}

const AccommodationUse: React.FC<AccommodationUseProps> = ({ initialAmenities, onStateChange }) => {
    const [amenities, setAmenities] = useState<string[]>(initialAmenities);
    const [rules, setRules] = useState<string>('');
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        onStateChange({ amenities, rules }); 
    }, [amenities, rules]);

    const handleRulesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setRules(inputText);
        }
    };

    const handleAddAmenity = (newAmenity: string) => {
        if (newAmenity && !amenities.includes(newAmenity)) {
            setAmenities([...amenities, newAmenity]);
            setValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();
            handleAddAmenity(value.trim());
            setValue('');
        }
    };

    return (
        <div className="p-8 mx-auto bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">숙소 이용</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">이용 규칙</h3>
                <Input
                    type="text"
                    id="rules"
                    placeholder="숙박객이 지켜주어야 하는 규칙에 대해 자유롭게 작성해주세요."
                    width="w-full"
                    height="h-[137px]"
                    className="resize-none"
                    value={rules}
                    onChange={handleRulesChange}
                />
                <p className="text-sm text-gray-500">{rules.length} / 1000</p>
            </div>

            <div>
                <h3 className="mb-4 text-base text-gray-400">숙소 시설/서비스</h3>
                <div className="grid grid-cols-7 gap-4">
                    {amenities.map((amenity, index) => (
                        <InputChips
                            key={index}
                            text={amenity}
                            value={amenity}
                            setValue={setValue}
                            className="text-xs text-gray-400"
                        />
                    ))}
                    <InputChips
                        value={value}
                        setValue={setValue}
                        editable={true}
                        placeholder="기타"
                        className="text-xs text-gray-400"
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccommodationUse;