// 숙소 정보
import React, { useState } from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';

declare global {
    interface Window {
        daum: any;
    }
}

const AccommodationInformation: React.FC = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [description, setDescription] = useState('');
    const [addressPlaceholder, setAddressPlaceholder] = useState('숙소 주소를 입력해주세요.');

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: (data: any) => {
                setAddress(data.address);
                setAddressPlaceholder(data.address);
            },
        }).open();
    };

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 50) {
            setName(inputText);
        }
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value;
        if (inputText.length <= 1000) {
            setDescription(inputText);
        }
    };

    return (
        <div className="flex flex-col p-6 bg-white rounded-lg P-8">
            <h2 className="mb-6 text-lg font-bold text-gray-500">숙소 정보</h2>

            <div className="mb-4">
                <Input
                    type="text"
                    id="accommodation-name"
                    placeholder="숙소 이름을 입력해주세요."
                    label="이름"
                    width="w-full"
                    height="h-[60px]"
                    className="text-gray-400"
                    value={name}
                    onChange={handleNameChange}
                />
                <p className="text-sm text-gray-500">{name.length} / 50</p>
            </div>

            <div className="flex items-center mb-4">
                <div className="w-full mr-4">
                    <Input
                        type="text"
                        id="accommodation-address"
                        placeholder={addressPlaceholder}
                        label="주소"
                        width='w-full'
                        height="h-[60px]"
                        className="text-gray-400"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className='w-52'>
                    <Button
                        size={BtnSize.m}
                        text="조회하기"
                        type={BtnType.line}
                        onClick={handleAddressSearch}
                    />
                </div>
            </div>

            <div className="mb-4">
                <Input
                    type="text"
                    id="accommodation-description"
                    placeholder="숙소에 대한 설명을 입력해주세요."
                    label="설명"
                    width="w-full"
                    height="h-[60px]"
                    className="text-gray-400"
                    value={description}
                    onChange={handleDescriptionChange}
                />
                <p className="text-sm text-gray-500">{description.length} / 1000</p>
            </div>
        </div>
    );
};

export default AccommodationInformation;
