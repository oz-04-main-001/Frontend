//숙소 이용
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import InputChips from '../../../../assets/InputChips';

const AccommodationUse: React.FC = () => {
    const initialFacilities = [
        '주차가능',
        '조식운영',
        '와이파이',
        '객실금연',
        '레스토랑',
        '바',
        '연회장',
        '뷔페',
    ];

    const [checkin, setCheckin] = useState<string>('');
    const [checkout, setCheckout] = useState<string>('');
    const [rules, setRules] = useState<string>('');
    const [facilities, setFacilities] = useState<string[]>(initialFacilities);
    const [value, setValue] = useState<string>('');

    const handleRulesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setRules(inputText);
        }
    };

    const handleAddFacility = (newFacility: string) => {
        if (newFacility && !facilities.includes(newFacility)) {
            setFacilities([...facilities, newFacility]);
            setValue('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && value.trim()) {
            e.preventDefault();
            handleAddFacility(value.trim());
            setValue('');
        }
    };

    return (
        <div className="p-8 mx-auto bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">숙소 이용</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크인</h3>
                <Input
                    type="text"
                    id="checkin"
                    placeholder="시간을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={checkin}
                    onChange={(e) => setCheckin(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크아웃</h3>
                <Input
                    type="text"
                    id="checkout"
                    placeholder="시간을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={checkout}
                    onChange={(e) => setCheckout(e.target.value)}
                />
            </div>

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
                    {facilities.map((facility, index) => (
                        <InputChips
                            key={index}
                            text={facility}
                            value={facility}
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
