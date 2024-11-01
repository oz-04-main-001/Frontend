import { useNavigate } from 'react-router-dom';
import Header from '../../../assets/Header';
import Documents from './components/Documents';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import ArrowIcon from '../../../assets/icons/Arrow3.svg?react';

const HostDocuments: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        labels={[
          { title: '게스트 메인', link: '/guest' },
          { title: '새 숙소 등록', link: '/register' },
          { title: '로그아웃', link: '/logout' },
        ]}
      />

      <div className="w-full px-20 mx-auto mt-14 bg-gray-50">
        <div className="mx-auto">
          <div className="flex items-center mb-4">
            <div className="mr-4 cursor-pointer " onClick={() => navigate(-1)}>
              <ArrowIcon width={24} height={24} />
            </div>
            <h5 className="text-2xl font-bold">증빙서류 등록</h5>
          </div>
          <h3 className="mb-8 text-lg text-gray-500">
            증빙서류를 등록해주세요.
          </h3>

          <div className="p-6 bg-white rounded-md shadow">
            <Documents />
          </div>
        </div>
      </div>

      <div className="w-[400px] mx-auto mt-10 mb-6">
        <Button
          size={BtnSize.l}
          text="완료"
          type={BtnType.normal}
          onClick={() => navigate('/Host/SelectType')}
        />
      </div>
    </div>
  );
};

export default HostDocuments;
