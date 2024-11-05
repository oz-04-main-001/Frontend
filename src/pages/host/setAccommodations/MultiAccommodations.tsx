//객실이 여러개 있는 숙소 세팅
import { useState, useEffect } from 'react';
import MultiRoomList from './components/MultiRoomList';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Header from '../../../assets/Header';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import axios from 'axios';
import { useSelectionStore } from '../../../stores/useSelectionStore';

const MultiAccommodations: React.FC = () => {
  const navigate = useNavigate();
  const selectedBuilding = useSelectionStore((state) => state.selectedBuilding) || '독채펜션';
  const [formData, setFormData] = useState({
    images: [], 
    accommodationInfo: { name: '', address: '', description: '', sido: '', sigungu: '', roadname: '', latitude: '', longitude: '' },
    accommodationUse: { amenities: [], rules: '' },
  });
  const [, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    const savedData = localStorage.getItem('multiAccommodationData');
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  const handleTemporarySave = () => {
    localStorage.setItem('multiAccommodationData', JSON.stringify(formData));
    console.log('임시저장 완료');
  };

  const handleFormChange = (sectionName: string, data: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [sectionName]: data
    }));
  };

  useEffect(() => {
    console.log('입력값', formData);
  }, [formData]);

  const handleAddRoom = () => {
    console.log('신규 객실 추가됨');
  };

  const handleSelectRoom = (room: string) => {
    console.log(`${room} 선택됨`);
    setSelectedRoom(room);
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    const accommodation = {
      name: formData.accommodationInfo.name,
      description: formData.accommodationInfo.description,
      rules: formData.accommodationUse.rules,
      is_active: true,
    };
    const accommodation_type = {
      type_name: selectedBuilding,
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
    formDataToSend.append("amenities", JSON.stringify(amenities));

    formData.images.forEach((image) => {
      formDataToSend.append(`images`, image);
    });

    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/accommodations/`, formDataToSend, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-CSRFTOKEN': import.meta.env.VITE_CSRF_TOKEN,
        },
      });
      console.log('숙소 등록 성공:', response.data);
      navigate('/onlyhost/multi-staterroom');
    } catch (error) {
      console.error('숙소 등록 중 오류:', error);
    }
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

      <div className="flex-grow ml-[330px] px-20 mx-28 pt-[10vh]">
        <div className="flex items-center mb-4">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold">숙소 등록</h1>
        </div>

        <div className="">
          <AccommodationsPhoto
            onStateChange={(data) => handleFormChange('images', data)}
          />
          <AccommodationInformation
            onStateChange={(data) => handleFormChange('accommodationInfo', data)}
          />
          <AccommodationUse
            onStateChange={(data) => handleFormChange('accommodationUse', data)}
          />
          <RefundPolicy />
        </div>

        <div className="flex justify-center w-full mt-12 mb-10 space-x-4">
          <div className='w-[550px]'>
            <Button
              size={BtnSize.l}
              text="임시저장"
              type={BtnType.line}
              onClick={handleTemporarySave}
            />
          </div>
          <div className='w-[550px]'>
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

export default MultiAccommodations;
