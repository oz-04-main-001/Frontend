//독채인 숙소 수정하기
import Header from '../../../assets/Header';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import OnlyRoomInformation from './components/OnlyRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditOnlyRoom: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        images: [],
        accommodationInfo: { name: '', address: '', description: '', sido: '', sigungu: '', roadname: '', latitude: '', longitude: '' },
        accommodationUse: { amenities: [], rules: '' },
        roomInfo: { checkin: '', checkout: '', pricing: '', selectedBeds: [], capacity: 1, room: 1 }
    });
    useEffect(() => {
        console.log('현재 입력값:', formData);
    }, [formData]);

    const handleFormChange = (sectionName: string, data: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [sectionName]: data
        }));
    };

    const handleSubmit = () => {
        console.log('저장된 데이터:', formData);
        navigate('/management');
    };

    return (
        <div>
            <Header
                labels={[
                    { title: '게스트 메인', link: '/guest' },
                    { title: '로그아웃', link: '/logout' }
                ]}
            />
            <div className="w-full mx-auto mt-[11vh]  bg-gray-50">
                <div className="flex items-center ">
                    <img src={ArrowIcon} alt="Arrow Icon" className="w-6 h-6 mr-4" onClick={() => navigate(-1)} />
                    <h1 className="text-2xl font-bold">숙소 수정</h1>
                </div>

                <div className="w-[1064px] mx-auto mt-10 space-y-10 ">
                    <h2 className="text-xl font-semibold text-gray-600">숙소</h2>
                    <AccommodationsPhoto
                        onStateChange={(data) => handleFormChange('photos', data)}
                    />
                    <AccommodationInformation
                        onStateChange={(data) => handleFormChange('accommodationInfo', data)}
                    />
                    <AccommodationUse
                        onStateChange={(data) => handleFormChange('accommodationUse', data)}
                    />
                    <h2 className="text-xl font-semibold text-gray-600">객실</h2>
                    <OnlyRoomInformation
                        onStateChange={(data) => handleFormChange('roomInfo', data)}
                    />
                </div>

                <div className="flex justify-center mt-12 mb-10">
                    <div className="w-[410px] h-[50px]">
                        <Button
                            size={BtnSize.l}
                            text="완료"
                            type={BtnType.normal}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditOnlyRoom;