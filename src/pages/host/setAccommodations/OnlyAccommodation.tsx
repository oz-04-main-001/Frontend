//독채인 경우 숙소 등록
import { useEffect, useState } from 'react';
import Header from '../../../assets/Header';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelectionStore } from '../../../stores/useSelectionStore';

const OnlyAccommodation: React.FC = () => {
    const navigate = useNavigate();
    const selectedBuilding = useSelectionStore((state) => state.selectedBuilding) || '독채펜션';
    const [formData, setFormData] = useState({
        images: [],
        accommodationInfo: { name: '', address: '', description: '', sido: '', sigungu: '', roadname: '', latitude: '', longitude: '' },
        accommodationUse: { amenities: [], rules: '' },
    });

    const handleFormChange = (sectionName: string, data: any) => {
        setFormData((prevData) => ({
            ...prevData,
            [sectionName]: data
        }));
    };
    useEffect(() => {
        console.log('입력값', formData);
    }, [formData]);

    const handleSubmit = async () => {
        const formDataToSend = new FormData();

        const accommodation = {
            name: formData.accommodationInfo.name,
            description: formData.accommodationInfo.description,
            rules: formData.accommodationUse.rules,
            is_active: true,
        };
        const accommodation_type = { 
            type_name:  selectedBuilding,
        };
        const GPS_info = {
            city: formData.accommodationInfo.sido,
            states: formData.accommodationInfo.sigungu,
            road_name: formData.accommodationInfo.roadname,
            address: formData.accommodationInfo.address,
            location: {
                type: "Point",
                coordinates: [
                    parseFloat(formData.accommodationInfo.longitude),
                    parseFloat(formData.accommodationInfo.latitude),
                ],
            }
        };
        // 이부분 백엔드 custom_name이 get받아온 리스트에 있는 것들 보냈을때만 가능함 ㅜㅜ 수정 요청하기 ㅜㅜ
        const amenities = {
            new: formData.accommodationUse.amenities
                .filter((amenity: { id: number | null }) => amenity.id === null)
                .map((amenity: { name: string }) => ({ name: amenity.name, is_custom: true })),
            default: formData.accommodationUse.amenities
                .filter((amenity: { id: number | null }) => amenity.id !== null)
                .map((amenity: { id: number }) => ({ amenity_id: amenity.id }))
        };

        formDataToSend.append("accommodation", JSON.stringify(accommodation));
        formDataToSend.append("accommodation_type", JSON.stringify(accommodation_type));
        formDataToSend.append("GPS_info", JSON.stringify(GPS_info));
        formDataToSend.append("amenities",JSON.stringify(amenities));

        formData.images.forEach((image) => {
            formDataToSend.append(`images`, image);
        });

        for (let [key, value] of formDataToSend.entries()) {
                console.log(`${key}: ${value}`);
        }
        
        //axios 폴더에 적기
        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/accommodations/`, formDataToSend, {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'multipart/form-data',
                    'X-CSRFTOKEN': import.meta.env.VITE_CSRF_TOKEN,
                },
            });
            console.log('숙소 등록 성공:', response.data);
            navigate('/OnlyStaterRoom');
        } catch (error) {
            console.error('숙소 등록 중 오류:', error);
        }
    };

    return (
        <div className="min-h-screen p-4 bg-gray-50">
            <Header
                labels={[
                    { title: '게스트 메인', link: '/guest' },
                    { title: '로그아웃', link: '/logout' },
                ]}
            />
            <div className="container mx-auto mt-[10vh] max-w-4xl">
                <div className="flex items-center mb-8">
                    <img
                        src={ArrowIcon}
                        alt="Arrow Icon"
                        className="w-6 h-6 mr-4 cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-3xl font-bold">숙소 등록</h1>
                </div>
                <div className="space-y-8">
                    <h2 className="text-xl font-semibold text-gray-600">숙소</h2>
                    <AccommodationsPhoto onStateChange={(data) => handleFormChange('images', data)} />
                    <AccommodationInformation onStateChange={(data) => handleFormChange('accommodationInfo', data)} />
                    <AccommodationUse onStateChange={(data) => handleFormChange('accommodationUse', data)} />
                    <RefundPolicy />
                </div>

                <div className="flex justify-center mt-12 mb-10">
                    <div className="w-full max-w-[410px]">
                        <Button
                            size={BtnSize.l}
                            text="다음"
                            type={BtnType.normal}
                            onClick={handleSubmit}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlyAccommodation;