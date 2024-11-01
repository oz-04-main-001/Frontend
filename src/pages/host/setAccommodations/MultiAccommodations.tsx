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

const MultiAccommodations: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    photos: [],
    accommodationInfo: {
      name: '',
      address: '',
      description: '',
      sido: '',
      sigungu: '',
      roadname: '',
      latitude: '',
      longitude: '',
    },
    accommodationUse: { amenities: [], rules: '' },
  });
  const [amenities, setAmenities] = useState<string[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

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

  useEffect(() => {
    console.log('입력값', formData);
  }, [formData]);

  const handleFormChange = (sectionName: string, data: any) => {
    setFormData(prevData => ({
      ...prevData,
      [sectionName]: data,
    }));
  };

  const handleAddRoom = () => {
    console.log('신규 객실 추가됨');
  };

  const handleSelectRoom = (room: string) => {
    console.log(`${room} 선택됨`);
    setSelectedRoom(room);
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();

    const accommodationData = {
      accommodation: {
        name: formData.accommodationInfo.name,
        description: formData.accommodationInfo.description,
        rules: formData.accommodationUse.rules,
        is_active: true,
      },
      gps_info: {
        city: formData.accommodationInfo.sido,
        states: formData.accommodationInfo.sigungu,
        road_name: formData.accommodationInfo.roadname,
        address: formData.accommodationInfo.address,
        location: {
          type: 'Point',
          coordinates: [
            parseFloat(formData.accommodationInfo.longitude),
            parseFloat(formData.accommodationInfo.latitude),
          ],
        },
      },
    };

    formDataToSend.append(
      'accommodation_data',
      new Blob([JSON.stringify(accommodationData)], {
        type: 'application/json',
      })
    );

    formData.photos.forEach((photo, index) => {
      formDataToSend.append(`images[${index}]`, photo);
    });

    for (let [key, value] of formDataToSend.entries()) {
      if (value instanceof Blob) {
        value.text().then(text => console.log(`${key}: ${text}`));
      } else {
        console.log(`${key}: ${value}`);
      }
    }

    // try {
    //   const response = await axios.post(
    //     'http://localhost/api/v1/accommodations/',
    //     formDataToSend,
    //     {
    //       headers: {
    //         'Content-Type': 'multipart/form-data',
    //       },
    //     }
    //   );
    //   console.log('숙소 등록 성공:', response.data);
    //   navigate('/MultiStaterRoom');
    // } catch (error) {
    //   console.error('숙소 등록 중 오류:', error);
    // }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '서비스 등록', link: '/register' },
          { title: '로그아웃', link: '/logout' },
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
          <h1 className="text-2xl font-bold">숙소 등록</h1>
        </div>

        <div className="space-y-10">
          <AccommodationsPhoto
            onStateChange={data => handleFormChange('photos', data)}
          />
          <AccommodationInformation
            onStateChange={data => handleFormChange('accommodationInfo', data)}
          />
          <AccommodationUse
            initialAmenities={formData.accommodationUse.amenities}
            onStateChange={data => handleFormChange('accommodationUse', data)}
          />
          <RefundPolicy />
        </div>

        <div className="flex justify-center w-full mt-12 mb-10 space-x-4">
          <div className="w-[550px]">
            <Button
              size={BtnSize.l}
              text="임시저장"
              type={BtnType.line}
              onClick={handleTemporarySave}
            />
          </div>
          <div className="w-[550px]">
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
