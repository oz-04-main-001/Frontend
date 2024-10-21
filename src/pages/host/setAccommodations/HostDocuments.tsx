//숙소 사업자등록사이트 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../../assets/Header'; // Header 컴포넌트 가져오기
import Documents from './components/Documents'; // Documents 컴포넌트 가져오기
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button'; // Button 컴포넌트 가져오기
import ArrowIcon from '../../../assets/icons/Arrow3.svg'; // 화살표 아이콘 가져오기

const HostDocuments: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '새 숙소 등록', link: '/register' },
          { title: '로그아웃', link: '/logout' },
        ]}
      />

      {/* 상단 타이틀 */}
      <div className="w-[1064px] mx-auto mt-14"> {/* 상단에 여유 공간 추가 */}
        <div className="flex items-center mb-4">
          <img
            src={ArrowIcon}
            alt="Arrow Icon"
            className="w-6 h-6 mr-4 cursor-pointer"
            onClick={() => navigate(-1)}
          />
          <h5 className="text-2xl font-bold">증빙서류 등록</h5>
        </div>
        <h3 className="text-lg text-gray-500">증빙서류를 등록해주세요.</h3>
      </div>

      {/* Documents 컴포넌트 */}
      <div className="w-[1064px] mx-auto mt-6">
        <Documents />
      </div>

      {/* 완료 버튼 */}
      <div className="w-[1064px] mx-auto mt-10 mb-6">
        <Button size={BtnSize.l} text="완료" type={BtnType.normal} onClick={() => navigate('/management')} />
      </div>
    </div>
  );
};

export default HostDocuments;
