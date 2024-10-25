// 숙소 객실 정보 컴포넌트
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import InputChips from '../../../../assets/InputChips';
import Counter from '../../../../assets/Counter';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';

const MultiRoomInformation: React.FC = () => {
    const initialRoomTypes = ['스탠다드', '스위트', '더블', '펜트하우스', '슈페리어'];
    const initialFacilities = ['주차가능', '조식운영', '와이파이', '객실금연', '레스토랑', '바', '연회장', '뷔페'];
    const [roomTypes, setRoomTypes] = useState<string[]>(initialRoomTypes);
    const [newRoomType, setNewRoomType] = useState<string>('');
    const [facilities, setFacilities] = useState<string[]>(initialFacilities);
    const [newFacility, setNewFacility] = useState<string>('');
    const [bedRows, setBedRows] = useState<number>(1);
    const [roomName, setRoomName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [selectedBeds, setSelectedBeds] = useState<string[]>(['']);
    const [pricing, setPricing] = useState<string>('');


    const addRoomType = () => {
        if (newRoomType.trim() !== '') {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType('');
        }
    };

    const addFacility = () => {
        if (newFacility.trim() !== '') {
            setFacilities([...facilities, newFacility]);
            setNewFacility('');
        }
    };

    const handleRoomTypeKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addRoomType();
        }
    };

    const handleFacilityKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addFacility();
        }
    };

    const handleIncrementRow = () => {
        setBedRows(bedRows + 1);
        setSelectedBeds([...selectedBeds, '']);
    };

    const handleDecrementRow = (rowIndex: number) => {
        if (bedRows > 1) {
            const updatedBeds = selectedBeds.filter((_, index) => index !== rowIndex);
            setBedRows(bedRows - 1);
            setSelectedBeds(updatedBeds);
        }
    };

    const handleBedSelection = (rowIndex: number, bedType: string) => {
        const updatedBeds = [...selectedBeds];
        updatedBeds[rowIndex] = bedType;
        setSelectedBeds(updatedBeds);
    };

    return (
        <div className="p-8 bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">객실</h2>

            <div className="mb-8">
                <h3 className="mb-4 text-lg text-gray-400">객실 유형</h3>
                <div className="grid grid-cols-3 gap-4">
                    {roomTypes.map((type, index) => (
                        <InputChips key={index} text={type} value={type} setValue={setNewRoomType} />
                    ))}
                    <InputChips
                        value={newRoomType}
                        setValue={setNewRoomType}
                        placeholder="객실 유형을 자유롭게 입력하세요."
                        editable={true}
                        onKeyPress={handleRoomTypeKeyPress}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">이름</h3>
                <Input
                    type="text"
                    id="room-name"
                    placeholder="객실 이름을 입력해주세요."
                    width="w-full"
                    height="h-[60px]"
                    value={roomName}
                    onChange={(e) => {
                        if (e.target.value.length <= 50) {
                            setRoomName(e.target.value);
                        }
                    }}
                />
                <p className="text-sm text-gray-500">{roomName.length} / 50</p>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">설명</h3>
                <Input
                    type="text"
                    id="room-description"
                    placeholder="숙소에 대한 설명을 입력해주세요."
                    width="w-full"
                    height="h-[137px]"
                    className="resize-none"
                    value={description}
                    onChange={(e) => {
                        if (e.target.value.length <= 1000) {
                            setDescription(e.target.value);
                        }
                    }}
                />
                <p className="text-sm text-gray-500">{description.length} / 1000</p>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 편의시설</h3>
                <div className="grid grid-cols-6 gap-4">
                    {facilities.map((facility, index) => (
                        <InputChips key={index} text={facility} value={facility} setValue={setNewFacility} />
                    ))}
                    <InputChips
                        value={newFacility}
                        setValue={setNewFacility}
                        placeholder="기타"
                        editable={true}
                        onKeyPress={handleFacilityKeyPress}
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">방 개수</h3>
                <div className="flex items-center justify-start">
                    <Counter size={16} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">기준인원</h3>
                <div className="flex items-center">
                    <span className="mr-4 text-lg text-gray-600">성인</span>
                    <Counter size={16} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">침대</h3>
                <div className="space-y-4">
                    {Array.from({ length: bedRows }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex items-center justify-between space-x-4">
                            <button
                                className="flex items-center justify-center w-[32px] h-[32px] text-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                                onClick={() => handleDecrementRow(rowIndex)}
                            >
                                -
                            </button>
                            <span className="text-lg text-gray-600">침대 {rowIndex + 1}</span>
                            <div className="flex items-center justify-between flex-grow space-x-2">
                                {initialRoomTypes.map((bed, bedIndex) => (
                                    <Button
                                        key={bedIndex}
                                        size={BtnSize.m}
                                        text={bed}
                                        type={selectedBeds[rowIndex] === bed ? BtnType.normal : BtnType.line}
                                        className="w-[160px] h-[40px]"
                                        onClick={() => handleBedSelection(rowIndex, bed)}
                                    />
                                ))}
                            </div>
                            <button
                                className="flex items-center justify-center w-[32px] h-[32px] text-gray-600 bg-white border-2 border-gray-300 rounded-lg shadow-md"
                                onClick={handleIncrementRow}
                            >
                                +
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 재고</h3>
                <Input
                    type="text"
                    id="room-stock"
                    placeholder="객실 수를 입력해주세요."
                    value=""
                    width="w-full"
                    height="h-[60px]"
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            id="pricing"
                            placeholder="1박 금액을 작성해주세요."
                            height="h-[60px]"
                            width='w-full'
                            className="text-right"
                            value={pricing}
                            onChange={(e) => setPricing(e.target.value)}
                        />
                    </div>
                    <span className="ml-2 text-lg text-gray-600">원</span>
                </div>
            </div>


        </div>
    );
};

export default MultiRoomInformation;
