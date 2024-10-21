// 숙소 사업자등록증 컴포넌트 
import React, { useState, cloneElement } from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import axios from 'axios'; 

const Documents: React.FC = () => {
    const [businessRegNum, setBusinessRegNum] = useState({ part1: '', part2: '', part3: '' });
    const [isBusinessRegValid, setIsBusinessRegValid] = useState(true);
    const [apiResult, setApiResult] = useState<string | null>(null); 

    // API 호출 함수
    const fetchBusinessRegStatus = async () => {
        const b_no = `${businessRegNum.part1}${businessRegNum.part2}${businessRegNum.part3}`;
        try {
            const response = await axios.post(
                `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${import.meta.env.VITE_DOCUMENT_API_KEY}`,
                {
                    b_no: [b_no]
                }
            );
            const data = response.data;
            setApiResult(data);
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error);
            setApiResult('조회 실패');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, part: string) => {
        const value = e.target.value;
        setBusinessRegNum({ ...businessRegNum, [part]: value });
    };

    const validateBusinessReg = () => {
        const { part1, part2, part3 } = businessRegNum;
        if (!part1 || !part2 || !part3) {
            setIsBusinessRegValid(false);
        } else {
            setIsBusinessRegValid(true);
            fetchBusinessRegStatus(); 
        }
    };

    const renderInputWithOnChange = (element: JSX.Element, part: string) => {
        return cloneElement(element, {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, part),
        });
    };

    return (
        <div className="w-[1064px] h-[640px] p-6 bg-white border-none rounded-lg">
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">사업자 등록 번호</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part1"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part1 ? 'border-red-500' : ''}`}
                            />,
                            'part1'
                        )}
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part2"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part2 ? 'border-red-500' : ''}`}
                            />,
                            'part2'
                        )}
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part3"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part3 ? 'border-red-500' : ''}`}
                            />,
                            'part3'
                        )}
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="조회하기"
                            type={BtnType.line}
                            onClick={validateBusinessReg} 
                        />
                    </div>
                </div>
                {!isBusinessRegValid && (
                    <p className="mt-1 text-sm text-red-500">사업자 등록 번호를 입력해주세요.</p>
                )}
                {apiResult && (
                    <p className="mt-2 text-sm text-gray-500">API 응답: {JSON.stringify(apiResult)}</p>
                )}
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">사업자 이메일</h3>
                <div className="flex items-center space-x-2">
                    <div className="flex-grow">
                        <Input type="text" id="email" placeholder="aaaaaa" />
                    </div>
                    <span>@</span>
                    <div className="flex-grow">
                        <Input type="text" id="domain" placeholder="gmail.com" />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">사업자 전화번호</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Input type="text" id="phone1" placeholder="010" />
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        <Input type="text" id="phone2" placeholder="1234" />
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        <Input type="text" id="phone3" placeholder="1234" />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">사업자 등록 주소</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Input type="text" id="address" placeholder="찾아보기...." />
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="찾아보기"
                            type={BtnType.line}
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">증빙서류 등록</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Input type="text" id="document" placeholder="찾아보기...." />
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="찾아보기"
                            type={BtnType.line}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents;

