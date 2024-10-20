// 객실이 여러개인 숙소 객실정보
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import Counter from '../../../../assets/Counter';
import Chips from '../../../../assets/Chips';
import Button, {BtnSize, BtnType} from '../../../../assets/buttons/Button';

const MultiRoomInformation: React.FC = () => {
    const initialRoomTypes = ['스탠다드', '스위트', '더블', '펜트하우스', '슈페리어'];
    const [roomTypes, setRoomTypes] = useState<string[]>(initialRoomTypes);
    const [newRoomType, setNewRoomType] = useState<string>('');
    const [bedRows, setBedRows] = useState<number>(1); 

    const roomFacilities = ['주차가능', '조식운영', '와이파이', '객실금연', '레스토랑', '바', '연회장', '뷔페', '기타'];

    const addRoomType = () => {
        if (newRoomType.trim() !== '') {
            setRoomTypes([...roomTypes, newRoomType]);
            setNewRoomType('');
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addRoomType(); 
        }
    };

    const handleIncrementRow = () => setBedRows(bedRows + 1);
    const handleDecrementRow = () => {
        if (bedRows > 1) setBedRows(bedRows - 1);
    };

    return (
        <div className="w-w-[1064px] h-[1500px] bg-white mx-auto p-8 border-none  rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">객실</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 유형</h3>
                <div className="grid grid-cols-3 gap-4">
                    {roomTypes.map((type, index) => (
                        <Chips key={index} text={type} />
                    ))}
                    <div className="flex items-center">
                        <input
                            type="text"
                            placeholder="객실 유형을 입력해주세요."
                            value={newRoomType}
                            onChange={(e) => setNewRoomType(e.target.value)}
                            onKeyPress={handleKeyPress} 
                            className="w-full h-[40px] border border-gray-300 rounded-md p-2"
                        />
                    </div>
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
                />
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
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 편의시설</h3>
                <div className="grid grid-cols-6 gap-4">
                    {roomFacilities.map((facility, index) => (
                        <Chips key={index} text={facility} />
                    ))}
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
                                onClick={handleDecrementRow}
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
                                        type={BtnType.line}
                                        className="w-[160px] h-[40px]"
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
                <p className="mt-1 text-sm text-gray-400">해당 유형은 재고 수량 변경이 불가능합니다.</p>
                <Input
                    type="text"
                    id="room-stock"
                    placeholder="1개"
                    width="w-[955px]"
                    height="h-[60px]"
                    className="ml-4"
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <Input
                        type="text"
                        id="pricing"
                        placeholder="1박 금액을 작성해주세요."
                        width="w-[955px]"
                        height="h-[60px]"
                        className="ml-4 text-right"
                    />
                    <span className="ml-2 text-lg text-gray-600">원</span>
                </div>
            </div>
        </div>
    );
};

export default MultiRoomInformation;
