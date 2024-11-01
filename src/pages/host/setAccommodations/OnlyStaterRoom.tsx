//독채인 경우 객실 등록
import  { useEffect, useState } from 'react';
import Header from '../../../assets/Header';
import OnlyRoomInformation from './components/OnlyRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const OnlyStaterRoom: React.FC = () => {
  const navigate = useNavigate();
  const [roomData, setRoomData] = useState({
    checkin: '',
    checkout: '',
    pricing: '',
    selectedBeds: [],
    capacity: 1,
    room: 1,
    selectedFacilities: [],
  });

  const handleRoomInfoChange = (data: any) => {
    setRoomData(prevData => ({
      ...prevData,
      ...data,
    }));
  };

  useEffect(() => {
    console.log('입력값', roomData);
  }, [roomData]);

  const handleSubmit = async () => {
    const postData = {
      check_in_time: roomData.checkin,
      check_out_time: roomData.checkout,
      price: parseInt(roomData.pricing) || 0,
      stay_type: true,
      is_available: true,
      capacity: roomData.capacity,
      room_type: {
        room: roomData.room,
      },
      facilities: roomData.selectedFacilities,
      upload_images: [''],
      inventory: {
        count_room: 1,
      },
    };
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '서비스 등록', link: '/register' },
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
          <h1 className="text-3xl font-bold">객실 등록</h1>
        </div>

        <div className="space-y-8">
          <h2 className="text-xl font-semibold text-gray-600">객실</h2>
          <OnlyRoomInformation onStateChange={handleRoomInfoChange} />
        </div>
      </div>

      <div className="flex justify-center mt-12 mb-10">
        <div className="w-full max-w-[600px]">
          <Button
            size={BtnSize.l}
            text="다음"
            type={BtnType.normal}
            onClick={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OnlyStaterRoom;
