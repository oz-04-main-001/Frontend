// 숙소 정보
import React, { useEffect, useState } from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import axios from 'axios';

declare global {
    interface Window {
        daum: any;
    }
}
interface AccommodationInformationProps{
    onStateChange: (data: { [key: string]:any}) => void;
}

const AccommodationInformation: React.FC<AccommodationInformationProps> = ({ onStateChange }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [sido, setSido] = useState('');
    const [sigungu, setSigungu] = useState('');
    const [roadname, setRoadname] = useState('');
    const [latitude, setLatitude] = useState(''); 
    const [longitude, setLongitude] = useState(''); 
    const [description, setDescription] = useState('');
    const [addressPlaceholder, setAddressPlaceholder] = useState('숙소 주소를 입력해주세요.');
    useEffect(() => {
        onStateChange({ name, address, description, sido, sigungu, roadname, latitude, longitude }); 
    }, [name, address, description, sido, sigungu, roadname, latitude, longitude]);

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: async (data: any) => {
                console.log('주소값',data); 
                setAddress(data.address);
                setSido(data.sido); 
                setSigungu(data.sigungu); 
                setRoadname(data.roadname); 
                setAddressPlaceholder(data.address);

                const geocodeUrl = `https://dapi.kakao.com/v2/local/search/address.json?query=${encodeURIComponent(data.address)}`;

                try {
                    const response = await axios.get(geocodeUrl, {
                        headers: {
                            Authorization: `KakaoAK ${import.meta.env.VITE_REST_API_KEY
                            }`,
                        },
                    });
    
                    if (response.data.documents && response.data.documents.length > 0) {
                        const { x: longitude, y: latitude } = response.data.documents[0];
                        setLatitude(latitude);
                        setLongitude(longitude);
                        console.log("위도", latitude, "경도", longitude);
                    } else {
                        console.error("좌표 정보를 찾을 수 없습니다.");
                    }       
                } catch (error) {
                    console.error("좌표 변환 중 오류 발생:", error);
                }
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
                    onChange={(e) => setName(e.target.value)}
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
                    placeholder="숙소에 대한 설명을 10자이상 입력해주세요."
                    label="설명"
                    width="w-full"
                    height="h-[60px]"
                    className="text-gray-400"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <p className="text-sm text-gray-500">{description.length} / 1000</p>
            </div>
        </div>
    );
};

export default AccommodationInformation;