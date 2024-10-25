//객실 하나만 있는 숙소
import React from 'react';
import Header from '../../../assets/Header';
import OnlyRoomInformation from './components/OnlyRoomInformation';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const OnlyStarterRoom: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '서비스 등록', link: '/register' },
          { title: '로그아웃', link: '/logout' },
        ]}
      />
      
      <div className="w-[1064px] mx-auto mt-[7vh]">
        <div className="flex items-center mb-4">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h1 className="text-2xl font-bold">객실 등록</h1>
        </div>
        <OnlyRoomInformation />
      </div>

      <div className="flex justify-center mt-12 mb-10">
        <div className="w-[600px]">
          <Button
            size={BtnSize.l}
            text="다음"
            type={BtnType.normal}
            onClick={() => navigate('/management')}
          />
        </div>
      </div>
    </div>
  );
};

export default OnlyStarterRoom;
