//독채인 경우 객실 등록
import { useEffect, useState } from 'react';
import Header from '../../../assets/Header';
import OnlyRoomInformation from './components/OnlyRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate, useParams } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

import axios from 'axios';

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
    const formData = new FormData();

    const room = {
      accommodation: 1,
      name: '객실 이름',
      capacity: roomData.capacity,
      price: parseInt(roomData.pricing) || 0,
      description: '객실 설명',
      check_in_time: roomData.checkin,
      check_out_time: roomData.checkout,
      is_available: true,
    };

    const inventory = {
      count_room: roomData.room,
    };

    const options = {
      new: [
        {
          name: 'Custom Option',
          category: 'extra',
          is_custom: true,
        },
      ],
      default: roomData.selectedFacilities.map(facility => ({
        option_id: facility,
      })),
    };

    const bedOptions = roomData.selectedBeds.map((bed: any) => ({
      bed_type: bed.type,
      quantity: bed.quantity,
    }));

    formData.append('room', JSON.stringify(room));
    formData.append('inventory', JSON.stringify(inventory));
    formData.append('options', JSON.stringify(options));
    formData.append('bed_options', JSON.stringify(bedOptions));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/v1/rooms/`,
        formData,
        {
          headers: {
            accept: 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-CSRFTOKEN': import.meta.env.VITE_ROOM_CSRF_TOKEN,
          },
        }
      );
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
          { title: '게스트 메인', link: '/' },
          { title: '서비스 등록', link: '/host/select-type' },
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
