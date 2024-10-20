//숙소 이용
import React from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import Chips from '../../../../assets/Chips';

const AccommodationUse: React.FC = () => {
    const facilities = ['주차가능', '조식운영', '와이파이', '객실금연', '레스토랑', '바', '연회장', '뷔페', '기타'];

    return (
        <div className="w-[1064px] h-[800px] bg-white mx-auto p-8 border-none rounded-lg">
            <h2 className="mb-6 text-lg text-gray-500">숙소 이용</h2>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크인</h3>
                <div className="flex items-center">
                    <div className="flex w-[220px] h-[60px]">
                        <Button
                            text="오전"
                            size={BtnSize.m}
                            type={BtnType.line}
                            className="bg-white w-[110px] h-[60px] border border-gray-300 text-gray-500"
                        />
                        <Button
                            text="오후"
                            size={BtnSize.m}
                            type={BtnType.line}
                            className="bg-white w-[110px] h-[60px] border border-gray-300 text-gray-500"
                        />
                    </div>
                    <Input
                        type="text"
                        id="checkin"
                        placeholder="시간을 입력해주세요."
                        width="w-[771px]"
                        height="h-[60px]"
                        className="ml-4"
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">체크아웃</h3>
                <div className="flex items-center">
                    <div className="flex w-[220px] h-[60px]">
                        <Button
                            text="오전"
                            size={BtnSize.m}
                            type={BtnType.line}
                            className="bg-white w-[110px] h-[60px] border border-gray-300 text-gray-500"
                        />
                        <Button
                            text="오후"
                            size={BtnSize.m}
                            type={BtnType.line}
                            className="bg-white w-[110px] h-[60px] border border-gray-300 text-gray-500"
                        />
                    </div>
                    <Input
                        type="text"
                        id="checkout"
                        placeholder="시간을 입력해주세요."
                        width="w-[771px]"
                        height="h-[60px]"
                        className="ml-4"
                    />
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-base text-gray-400">이용 규칙</h3>
                <Input
                    type="text"
                    id="rules"
                    placeholder="숙박객이 지켜주어야 하는 규칙에 대해 자유롭게 작성해주세요."
                    width="w-[1024px]"
                    height="h-[137px]"
                    className="resize-none"
                />
            </div>

            <div>
                <h3 className="mb-4 text-base text-gray-400">숙소 시설/서비스</h3>
                <div className="grid grid-cols-7 gap-4">
                    {facilities.map((facility, index) => (
                        <Chips key={index} text={facility} className="text-xs text-gray-400" />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AccommodationUse;
