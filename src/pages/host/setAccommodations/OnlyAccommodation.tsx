//독채인 경우 숙소 등록
import React from 'react';
import Header from '../../../assets/Header';
import ArrowIcon from '../../../assets/icons/arrow3.svg';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import { useNavigate } from 'react-router-dom';


const OnlyAccommodation: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className='bg-gray-50'>
            <Header
                labels={[
                    { title: '게스트 메인', link: '/guest' },
                    { title: '서비스 등록', link: '/register' },
                    { title: '로그아웃', link: '/logout' },
                ]}
            />
            <div className="w-[1064px] mx-auto mt-[7vh]">
                <div className="flex items-center ">
                    <img
                        src={ArrowIcon}
                        alt="Arrow Icon"
                        className="w-6 h-6 mr-4"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold">숙소 등록</h1>
                </div>
                <div className="w-[1064px] mx-auto mt-10 space-y-10">
                    <h2 className="text-xl font-semibold text-gray-600">숙소</h2>
                    <AccommodationsPhoto />
                    <AccommodationInformation />
                    <AccommodationUse />
                    <RefundPolicy/>
                </div>

                <div className="flex justify-center mt-12 mb-10">
                    <div className="w-[410px] h-[50px]">
                        <Button
                            size={BtnSize.l}
                            text="다음"
                            type={BtnType.normal}
                            onClick={() => navigate('/OnlyStaterRoom')}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OnlyAccommodation;