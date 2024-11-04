// 객실이 여러개인 숙소 - 객실 수정하기
import { useState } from 'react';
import MultiRoomList from './components/MultiRoomList';
import MultiRoomInformation from './components/MultiRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Header from '../../../assets/Header';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import RoomPhoto from './components/RoomPhoto';

const EditMultiRoom: React.FC = () => {
  const navigate = useNavigate();
  // const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [roomInfo, setRoomInfo] = useState({
    checkin: '',
    checkout: '',
    pricing: '',
    roomName: '',
    description: '',
    selectedBeds: [''],
    room: 1,
    capacity: 1,
    bedRows: 1,
  });
  console.log(roomInfo);

  const handleAddRoom = () => {
    console.log('신규 객실 추가하기 클릭됨');
  };

  const handleSelectRoom = (room: string) => {
    // setSelectedRoom(room);
    console.log(`${room} 객실 선택됨`);
  };

  const handleRoomInfoChange = (data: any) => {
    setRoomInfo(data);
    console.log('객실 정보 업데이트:', data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/' },
        ]}
      />

      <div className="flex">
        <div className="w-[300px] bg-gray-100">
          <MultiRoomList
            onAddRoom={handleAddRoom}
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
            <h1 className="text-2xl font-bold">숙소 객실 수정</h1>
          </div>

          <div className="mb-4">
            <h6 className="text-gray-500">서울특별시 서초구 서래동 123-45</h6>
            <h3 className="font-semibold">가나다 숙소</h3>
            <p className="text-gray-700">입실 16:00 / 퇴실 11:00</p>
          </div>

          <div className="space-y-10">
            <RoomPhoto />
            <MultiRoomInformation
              room={roomInfo.room}
              onRoomChange={value => setRoomInfo({ ...roomInfo, room: value })}
              capacity={roomInfo.capacity}
              onCapacityChange={value =>
                setRoomInfo({ ...roomInfo, capacity: value })
              }
              onStateChange={handleRoomInfoChange}
            />
          </div>

          <div className="flex justify-center w-full mt-12 mb-10 space-x-4">
            <div className="w-[800px]">
              <Button
                size={BtnSize.l}
                text="저장"
                type={BtnType.normal}
                onClick={() => {
                  navigate('/host/management');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditMultiRoom;
