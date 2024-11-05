//독채인 경우 객실 등록
import { useEffect, useState } from 'react';
import Header from '../../../assets/Header';
import OnlyRoomInformation from './components/OnlyRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import axios from 'axios';

const OnlyStaterRoom: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accommodation_id = location.state?.accommodation_id || 106; 

  const [roomData, setRoomData] = useState({
    checkin: '',
    checkout: '',
    pricing: '',
    bedOptions: [] as { type: string }[],
    bedCount: 0,
    capacity: 1,
    room: 1,
    selectedFacilities: [] as { id: number | null; name: string }[],
  });

  const handleRoomInfoChange = (data: any) => {
    setRoomData((prevData) => ({
      ...prevData,
      ...data,
    }));
  };

  useEffect(() => {
    console.log('입력값', roomData);
  }, [roomData]);

  const handleRoomSubmit = async () => {
    const token = localStorage.getItem('auth_token'); 
    if (!token) {
      console.warn('토큰이 없습니다. 로그인 후 다시 시도하세요.');
      return; 
    }

    const formData = new FormData();

    const room = {
      accommodation: accommodation_id,
      name: '객실 이름',
      capacity: roomData.capacity,
      price: parseInt(roomData.pricing) || 0,
      description: '독채인 숙소 객실 설명란입니다',
      check_in_time: roomData.checkin,
      check_out_time: roomData.checkout,
      is_available: true,
      room_quantity: {
        quantity: roomData.room,
        name: 'room_quantity'
      }
    };
    
    const inventory = {
      count_room: 1,
    };

    const options = {
      new:[{
          name:"string",
          category: 'extra',
          is_custom: true,
        }],
      
      default: [{
          option_id: 0,
        }],
    };

    console.log('Room Data:', room);
    console.log('Inventory Data:', inventory);
    console.log('Options Data:', options);


    formData.append('room', JSON.stringify(room));
    formData.append('inventory', JSON.stringify(inventory));
    formData.append('options', JSON.stringify(options));

    roomData.bedOptions.forEach((bed, index) => {
      const bedOption = {
        bed_type: bed.type,
        quantity: index + 1, 
      };
      formData.append('bed_options', JSON.stringify(bedOption));
    });

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
}

    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/rooms/`, formData, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-CSRFTOKEN': import.meta.env.VITE_ROOM_CSRF_TOKEN,
          'Authorization': `Bearer ${token}`, 
        },
      });
      console.log('객실 등록 성공', response.data);
      navigate('/host/management');
    } catch (error) {
      console.error('객실 등록 중 오류 발생', error);
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '새 숙소 등록하기', link: '/host/select-type' },
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
            onClick={handleRoomSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default OnlyStaterRoom;

