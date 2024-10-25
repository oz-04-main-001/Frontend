//객실이 여러개 있는 숙소 세팅
import React, { useState } from 'react';
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
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleAddRoom = () => {
    console.log('신규 객실 추가됨');
  };

  const handleSelectRoom = (room: string) => {
    console.log(`${room} 선택됨`);
    setSelectedRoom(room);
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
            <h1 className="text-2xl font-bold">숙소 등록</h1>
          </div>
          <div className="mb-4">
            <h6 className="text-gray-500">서울특별시 서초구 서래동 123-45</h6>
            <h3 className="font-semibold">가나다 숙소</h3>
            <p className="text-gray-700">입실 16:00 / 퇴실 11:00</p>
          </div>

          <div className="space-y-10">
            <AccommodationsPhoto />
            <AccommodationInformation />
            <AccommodationUse />
            <RefundPolicy />
          </div>

          <div className="flex justify-center w-full mt-12 mb-10 space-x-4">
            <div className='w-[550px]'>
              <Button
                size={BtnSize.l}
                text="임시저장"
                type={BtnType.line}
                onClick={() => console.log('저장 클릭')}
              />
            </div>
            <div className='w-[550px]'>
              <Button
                size={BtnSize.l}
                text="다음"
                type={BtnType.normal}
                onClick={() => navigate('/MultiStaterRoom')}
              />
            </div>
          </div>

        </div>
      </div>
  );
};

export default MultiAccommodations;
