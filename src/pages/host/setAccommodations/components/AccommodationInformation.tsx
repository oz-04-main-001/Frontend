// 숙소 정보
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';  // Button 컴포넌트 가져오기

declare global {
    interface Window {
        daum: any;
    }
}

const AccommodationInformation: React.FC = () => {
    const [addressPlaceholder, setAddressPlaceholder] = useState('숙소 주소를 입력해주세요.');

    // 카카오 주소 검색 API 호출 함수
    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data: any) => {
                setAddressPlaceholder(data.address);  // 선택된 주소로 placeholder 업데이트
            },
        }).open();
    };

    return (
        <div className="bg-white flex flex-col w-[1062px] h-[540px] p-6 rounded-lg">
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
                <div className="flex items-center">
                    <Input
                        type="text"
                        id="accommodation-address"
                        placeholder={addressPlaceholder} // 주소가 placeholder로 표시
                        label="주소"
                        width="w-[900px]" // 입력 필드 크기 조정
                        height="h-[60px]"
                        className="text-gray-400"
                    />
                    <Button
                        size={BtnSize.m}     // 중간 크기 버튼 사용
                        text="조회하기"       // 버튼 텍스트
                        type={BtnType.line} // 기본 타입 사용
                        onClick={handleAddressSearch} // 조회 버튼 클릭 시 주소 검색 API 호출
                    />
                </div>
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
