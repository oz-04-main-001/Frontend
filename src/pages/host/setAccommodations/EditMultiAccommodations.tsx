// 객실이 여러개인 숙소 수정하기
import React from 'react';
import MultiRoomList from './components/MultiRoomList';
import AccommodationsPhoto from './components/AccommodationsPhoto';
import AccommodationInformation from './components/AccommodationInformation';
import AccommodationUse from './components/AccommodationUse';
import RefundPolicy from './components/RefundPolicy';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Header from '../../../assets/Header';
import { useNavigate } from 'react-router-dom';
import ArrowIcon from '../../../assets/icons/arrow3.svg';

const EditMultiAccommodations: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="flex min-h-screen overflow-auto bg-gray-50">
            <div className="w-[385px] min-h-screen absolute z-20 bg-gray-100">
                <MultiRoomList />
            </div>

            <div className="flex flex-col w-full mx-auto space-y-10 pl-[385px] pt-[10vh]">
                <div className="z-10">
                    <Header
                        labels={[
                            { title: '게스트 메인', link: '/guest' },
                            { title: '서비스 등록', link: '/register' },
                            { title: '로그아웃', link: '/logout' }
                        ]}
                    />
                </div>

                <div className="w-[1064px] mx-auto flex flex-col items-start mt-[4vh]">
                    <div className="flex items-center mb-2">
                        <img src={ArrowIcon} alt="Arrow Icon" className="w-6 h-6 mr-4" onClick={() => navigate(-1)} />
                        <h1 className="text-2xl font-bold">숙소 수정</h1>
                    </div>
                    <div>
                        <div className="mb-4">
                            <h6 className="text-gray-500">서울특별시 서초구 서래동 123-45</h6>
                        </div>
                        <div className="mb-4">
                            <h3 className="font-semibold">가나다 숙소</h3>
                        </div>
                        <div className="mb-6">
                            <p className="text-gray-700">입실 16:00 / 퇴실 11:00</p>
                        </div>
                    </div>

                    <div className="w-[1064px] mx-auto space-y-10">
                        <AccommodationsPhoto />
                        <AccommodationInformation />
                        <AccommodationUse />
                        <RefundPolicy />
                    </div>

                    <div className="flex justify-center w-[1064px] mx-auto mt-12 mb-10 space-x-4">
                        <div className='w-[450px] h-[50px]'>
                            <Button
                                size={BtnSize.l}
                                text="저장"
                                type={BtnType.line}
                                onClick={() => console.log('저장 클릭')}
                            />
                        </div>
                        <div className='w-[450px] h-[50px]'>
                            <Button
                                size={BtnSize.l}
                                text="수정 완료"
                                type={BtnType.normal}
                                onClick={() => navigate('/EditMultiRoom')}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default EditMultiAccommodations;
