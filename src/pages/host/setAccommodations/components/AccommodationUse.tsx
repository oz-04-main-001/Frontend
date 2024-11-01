//숙소 이용
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Input } from '../../../../assets/Input';
import InputChips from '../../../../assets/InputChips';

interface Amenity {
    id: number | null;
    name: string;
}

interface AccommodationUseProps {
    onStateChange: (data: { amenities: Amenity[]; rules: string }) => void;
}

const AccommodationUse: React.FC<AccommodationUseProps> = ({ onStateChange }) => {
    const [amenities, setAmenities] = useState<Amenity[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<Amenity[]>([]);
    const [rules, setRules] = useState<string>('');
    const [value, setValue] = useState<string>('');

    
    useEffect(() => {
        const fetchAmenities = async () => {
            try {
                const response = await axios.get('http://localhost/api/v1/accommodations/amenity-choices/', {
                    headers: {
                        accept: 'application/json',
                    },
                });
                setAmenities(response.data.map((name: string, index: number) => ({ id: index, name })));
            } catch (error) {
                console.error('어메니티 리스트 가져오기 오류:', error);
            }
        };

        fetchAmenities();
    }, []);

    useEffect(() => {
        onStateChange({ amenities: selectedAmenities, rules });
    }, [selectedAmenities, rules]);

    const handleRulesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setRules(inputText);
        }
    };

    const handleAddAmenity = (newAmenity: string) => {
        if (newAmenity && !amenities.find((a) => a.name === newAmenity)) {
            const newAmenityObj = { id: null, name: newAmenity };
            setAmenities([...amenities, newAmenityObj]);
            setValue('');
        }
    };

    const handleAmenityClick = (amenity: Amenity) => {
        setSelectedAmenities((prevSelected) => {
            if (prevSelected.find((a) => a.name === amenity.name)) {
                return prevSelected.filter((a) => a.name !== amenity.name);
            } else {
                return [...prevSelected, amenity];
            }
        });
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
                <div className="grid grid-cols-4 gap-4">
                    {amenities.map((amenity) => (
                        <div
                            key={amenity.id ?? amenity.name}
                            onClick={() => handleAmenityClick(amenity)}
                            className={`cursor-pointer p-2 rounded text-xs ${
                                selectedAmenities.find((a) => a.name === amenity.name)
                                    ? 'bg-gray-50 text-white font-bold' 
                                    : ' text-gray-400'    
                            }`}
                        >
                            <InputChips
                                key={amenity.id ?? amenity.name}
                                text={amenity.name}
                                value={amenity.name}
                                setValue={setValue}
                                className="text-xs"
                            />

                        </div>
                    ))}
                    <InputChips
                        value={value}
                        setValue={setValue}
                        editable={true}
                        placeholder="기타"
                        className="text-xs"
                        onKeyPress={handleKeyPress}
                    />
                </div>
            </div>
        </div>
    );
};

export default AccommodationUse;
