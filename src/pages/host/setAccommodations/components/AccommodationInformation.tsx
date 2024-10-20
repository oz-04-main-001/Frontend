// 숙소 정보
import React from 'react';
import { Input } from '../../../../assets/Input';

const AccommodationInformation: React.FC = () => {
    return (
        <div className="bg-white flex flex-col w-[1062px] h-[540px] p-6 rounded-lg" >
            <h2 className="mb-6 text-lg font-bold text-gray-500">숙소 정보</h2>

            <div className="mb-4">
                <Input
                    type="text"
                    id="accommodation-name"
                    placeholder="숙소 이름을 입력해주세요."
                    label="이름"
                    width="w-[1024px]"
                    height="h-[60px]"
                    className="text-gray-400"
                />
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    id="accommodation-address"
                    placeholder="숙소 주소를 입력해주세요."
                    label="주소"
                    width="w-[1024px]"
                    height="h-[60px]"
                    className="text-gray-400"
                />
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    id="accommodation-description"
                    placeholder="숙소에 대한 설명을 입력해주세요."
                    label="설명"
                    width="w-[1024px]"
                    height="h-[137px]"
                    className="text-gray-400"
                />
            </div>
        </div>
    );
};

export default AccommodationInformation;

