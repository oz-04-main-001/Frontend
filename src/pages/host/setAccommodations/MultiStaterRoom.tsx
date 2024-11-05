//객실이 여러개 있는 숙소의 객실 세팅
import { useState, useEffect } from 'react';
import MultiRoomList from './components/MultiRoomList';
import MultiRoomInformation from './components/MultiRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Header from '../../../assets/Header';
import { useNavigate, useLocation } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import axios from 'axios';
import RoomPhoto from './components/RoomPhoto';

const MultiStaterRoom: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const accommodation_id = location.state?.accommodation_id || 107;
  const [roomInfo, setRoomInfo] = useState({
    checkin: '',
    checkout: '',
    pricing: '',
    roomName: '',
    description: '',
    selectedBeds: [{ type: 'single', quantity: 1 }],
    room: 1,
    capacity: 1,
    images: [] as File[],
    selectedFacilityIds: [] as number[],
    selectedCustomFacilities: [] as string[],
  });

  useEffect(() => {
    console.log('현재 입력된 객실 정보:', roomInfo);
  }, [roomInfo]);

  const handleRoomSubmit = async () => {
    const token = localStorage.getItem('auth_token');
    if (!token) {
      console.warn('토큰이 없습니다. 로그인 후 다시 시도하세요.');
      return;
    }

    const formDataToSend = new FormData();

    const roomData = {
      price: parseInt(roomInfo.pricing),
      name: roomInfo.roomName,
      room_quantity: { quantity: roomInfo.room, name: 'room_quantity' },
      check_in_time: roomInfo.checkin,
      check_out_time: roomInfo.checkout,
      accommodation: accommodation_id,
      is_available: true,
      capacity: roomInfo.capacity,
      description: roomInfo.description,
    };
    formDataToSend.append('room', JSON.stringify(roomData));

    if (roomInfo.images && roomInfo.images.length > 0) {
      roomInfo.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
    }

    formDataToSend.append('room_type', JSON.stringify({ is_customized: false, type_name: '스탠다드' }));
    formDataToSend.append('inventory', JSON.stringify({ count_room: roomInfo.room }));

    const options = {
      new: [{
        name: "string",
        category: 'extra',
        is_custom: true,
      }],

      default: [{
        option_id: 0,
      }],
    };
    formDataToSend.append('options', JSON.stringify(options));

    const bedOptions = roomInfo.selectedBeds.map(bed => ({
      bed_type: bed.type,
      quantity: bed.quantity,
    }));
    formDataToSend.append('bed_options', JSON.stringify(bedOptions));

    for (let [key, value] of formDataToSend.entries()) {
      console.log(`${key}: ${value}`);
    }


    try {
      const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/rooms/`, formDataToSend, {
        headers: {
          'accept': 'application/json',
          'Content-Type': 'multipart/form-data',
          'X-CSRFTOKEN': import.meta.env.VITE_ROOM_CSRF_TOKEN,
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('객실 등록 성공:', response.data);
      navigate('/host/management');
    } catch (error) {
      console.error('객실 등록 중 오류 발생:', error);
    }
  };

  const handleSelectRoom = (room: string) => {
    console.log(`${room} 객실 선택됨`);
  };

  const handleRoomInfoChange = (data: any) => {
    setRoomInfo(prev => ({ ...prev, ...data }));
  };

  const handleImageChange = (photos: File[]) => {
    setRoomInfo(prev => ({ ...prev, images: photos }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '로그아웃', link: '/logout' },
        ]}
      />

      <div className="flex">
        <div className="w-[300px] bg-gray-100">
          <MultiRoomList
            onAddRoom={handleRoomSubmit}
            onSelectRoom={handleSelectRoom}
          />
        </div>

        <div className="flex-grow justify-center ml-[330px] px-20 mx-48 pt-[10vh]">
          <div className="flex items-center mb-4">
            <img
              src={ArrowIcon}
              alt="Arrow Icon"
              className="w-6 h-6 mr-4 cursor-pointer"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">숙소 객실 등록</h1>
          </div>

          <div className="mb-4">
            <h6 className="text-gray-500">서울특별시 서초구 서래동 123-45</h6>
            <h3 className="font-semibold">가나다 숙소</h3>
            <p className="text-gray-700">입실 16:00 / 퇴실 11:00</p>
          </div>

          <div className="space-y-10">
            <RoomPhoto onStateChange={handleImageChange} />
            <MultiRoomInformation
              room={roomInfo.room}
              onRoomChange={value => setRoomInfo({ ...roomInfo, room: value })}
              capacity={roomInfo.capacity}
              onCapacityChange={value => setRoomInfo({ ...roomInfo, capacity: value })}
              onStateChange={handleRoomInfoChange}
            />
          </div>

          <div className="flex justify-center flex-grow w-full mt-12 mb-10 space-x-4">
            <div className="w-[800px]">
              <Button
                size={BtnSize.l}
                text="다음"
                type={BtnType.normal}
                onClick={handleRoomSubmit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStaterRoom;
