//독채인 숙소 객실 정보
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import Counter from '../../../../assets/Counter';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';

const OnlyRoomInformation: React.FC = () => {
    const initialBeds = ['슈퍼싱글', '싱글', '더블', '퀸', '킹'];
    const [bedRows, setBedRows] = useState<number>(1);
    const [selectedBeds, setSelectedBeds] = useState<string[]>(['']); 
    const [pricing, setPricing] = useState<string>('');


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
        <div className="p-8 mx-auto bg-white border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">객실 정보</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">기준인원</h3>
                <div className="flex items-center">
                    <span className="mr-4 text-lg text-gray-600">성인</span>
                    <Counter size={16} />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">객실 재고</h3>
                <p className="mt-1 text-sm text-gray-400">해당 유형은 재고 수량 변경이 불가능합니다.</p>
                <Input
                    type="text"
                    id="room-stock"
                    placeholder="1개"
                    value="1개"
                    width="w-full"
                    height="h-[60px]"
                />
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">방 개수</h3>
                <div className="flex items-center">
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
                                {initialBeds.map((bed, bedIndex) => (
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
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <div className="flex-grow">
                        <Input
                            type="text"
                            id="pricing"
                            placeholder="1박 금액을 작성해주세요."
                            width='w-full'
                            height="h-[60px]"
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

export default OnlyRoomInformation;
