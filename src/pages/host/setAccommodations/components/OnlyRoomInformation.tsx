//독채인 숙소 객실 정보
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import Counter from '../../../../assets/Counter';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import RefundPolicy from './RefundPolicy';

const OnlyRoomInformation: React.FC = () => {
    const initialBeds = ['슈퍼싱글', '싱글', '더블', '퀸', '킹'];
    const [bedRows, setBedRows] = useState<number>(1);

    // 침대 줄 추가 및 제거 함수
    const handleIncrementRow = () => setBedRows(bedRows + 1);
    const handleDecrementRow = () => {
        if (bedRows > 1) setBedRows(bedRows - 1);
    };

    return (
        <div className="w-[1064px] h-[1200px] bg-white mx-auto p-8 border-none rounded-lg">
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
                <Input
                    type="text"
                    id="room-stock"
                    placeholder="1개"
                    width="w-[960px]"
                    height="h-[60px]"
                    className="ml-4"
                />
                <p className="mt-1 text-sm text-gray-400">해당 유형은 재고 수량 변경이 불가능합니다.</p>
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
                                onClick={handleDecrementRow}
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
                <h3 className="mb-2 text-lg text-gray-400">요금책정</h3>
                <div className="flex items-center">
                    <Input
                        type="text"
                        id="pricing"
                        placeholder="1박 금액을 작성해주세요."
                        width="w-[960px]"
                        height="h-[60px]"
                        className="ml-4 text-right"
                    />
                    <span className="ml-2 text-lg text-gray-600">원</span> 
                </div>
            </div>

            <div className="w-[1024px]">
                <RefundPolicy />
            </div>
        </div>
    );
};

export default OnlyRoomInformation;
