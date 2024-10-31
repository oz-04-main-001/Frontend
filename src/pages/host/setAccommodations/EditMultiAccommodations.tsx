// 객실이 여러개인 숙소 수정하기
import React, { useState, useEffect } from 'react';
import MultiRoomList from './components/MultiRoomList';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Header from '../../../assets/Header';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const EditMultiAccommodations: React.FC = () => {
    const navigate = useNavigate();
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        photos: [],
        accommodationInfo: { name: '', address: '', description: '', sido: '', sigungu: '', roadname: '', latitude: '', longitude: '' },
        accommodationUse: { amenities: [], rules: '' },
    });

    useEffect(() => {
        console.log(' 입력값:', formData);
    }, [formData]);

    const handleFormChange = (sectionName: string, data: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [sectionName]: data
        }));
    };

    const handleAddRoom = () => {
        console.log('신규 객실 추가됨');
    };

    const handleSelectRoom = (room: string) => {
        console.log(`${room} 선택됨`);
        setSelectedRoom(room);
    };

    const handleSubmit = () => {
        console.log( formData);
        navigate('/MultiStaterRoom');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header
                labels={[
                    { title: '게스트 메인', link: '/guest' },
                    { title: '서비스 등록', link: '/register' },
                    { title: '로그아웃', link: '/logout' }
                ]}
            />
            <MultiRoomList
                onAddRoom={handleAddRoom}
                onSelectRoom={handleSelectRoom}
            />

            <div className="flex-grow ml-[330px] px-20 mx-48 pt-[10vh]">
                <div className="flex items-center mb-4">
                    <img
                        src={ArrowIcon}
                        alt="Arrow Icon"
                        className="w-6 h-6 mr-4 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold">숙소 수정</h1>
                </div>
                <div className="mb-4">
                    <h6 className="text-gray-500">서울특별시 서초구 서래동 123-45</h6>
                    <h3 className="font-semibold">가나다 숙소</h3>
                    <p className="text-gray-700">입실 16:00 / 퇴실 11:00</p>
                </div>

                <div className="space-y-10">
                    <AccommodationsPhoto 
                        onStateChange={(data) => handleFormChange('photos', data)} 
                    />
                    <AccommodationInformation 
                        onStateChange={(data) => handleFormChange('accommodationInfo', data)} 
                    />
                    <AccommodationUse 
                        initialAmenities={formData.accommodationUse.amenities} 
                        onStateChange={(data) => handleFormChange('accommodationUse', data)} 
                    />
                    <RefundPolicy />
                </div>

                <div className="flex justify-center w-full mt-12 mb-10 space-x-4">
                    <div className='w-[450px]'>
                        <Button
                            size={BtnSize.l}
                            text="저장"
                            type={BtnType.normal}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditMultiAccommodations;