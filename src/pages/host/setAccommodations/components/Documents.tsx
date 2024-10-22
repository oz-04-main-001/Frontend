// 숙소 사업자등록증 컴포넌트 
import React, { useState, cloneElement } from 'react';
import { Input } from '../../../../assets/Input'; // Input 컴포넌트 불러옴
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button'; // Button 컴포넌트 불러옴
import axios from 'axios'; // axios를 이용해 API 호출 준비

const Documents: React.FC = () => {
    const [businessRegNum, setBusinessRegNum] = useState({ part1: '', part2: '', part3: '' }); // 사업자 등록 번호를 세 부분으로 관리하는 상태
    const [isBusinessRegValid, setIsBusinessRegValid] = useState(true); // 사업자 등록번호 유효성 상태 관리
    const [apiResult, setApiResult] = useState<string | null>(null); // API 호출 결과 상태 관리

    // API 호출 함수
    const fetchBusinessRegStatus = async () => {
        const b_no = `${businessRegNum.part1}${businessRegNum.part2}${businessRegNum.part3}`; // 세 부분을 합쳐 사업자 번호 완성
        console.log('API로 전송되는 사업자 번호:', b_no); 
        try {
            const response = await axios.post(
                `https://api.odcloud.kr/api/nts-businessman/v1/validate?serviceKey=${import.meta.env.VITE_DOCUMENT_API_KEY}`, // 외부 API로 사업자 등록번호 검증
                {
                    b_no: [b_no] // 사업자 번호 데이터를 API에 보냄
                }
            );
            const data = response.data;
            setApiResult(data); // 응답 데이터를 상태로 저장
            console.log(data) // 콘솔에 응답 출력
        } catch (error) {
            console.error('API 호출 중 오류 발생:', error); // 오류가 발생하면 콘솔에 출력
            setApiResult('조회 실패'); // 오류 발생 시 '조회 실패'로 상태 설정
        }
    };

    // Input 값 변경 처리 함수
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, part: string) => {
        const value = e.target.value;
        setBusinessRegNum({ ...businessRegNum, [part]: value }); // 변경된 부분에 해당하는 상태 업데이트
    };

    // 사업자 등록번호 유효성 검사 및 API 호출 함수
    const validateBusinessReg = () => {
        const { part1, part2, part3 } = businessRegNum;
        if (!part1 || !part2 || !part3) { // 각 부분이 입력되지 않은 경우
            setIsBusinessRegValid(false); // 유효하지 않음을 표시
        } else {
            setIsBusinessRegValid(true); // 유효함을 표시하고
            fetchBusinessRegStatus(); // API 호출
        }
    console.log(businessRegNum) 
    };

    // Input 컴포넌트에 onChange 이벤트 추가
    const renderInputWithOnChange = (element: JSX.Element, part: string) => {
        return cloneElement(element, {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleInputChange(e, part), // 입력값 변경 시 handleInputChange 호출
        });
    };

    return (
        <div className="w-[1064px] h-[640px] p-6 bg-white border-none rounded-lg"> {/* 문서 폼을 감싸는 컨테이너 */}
            <div className="mb-6">
                <h3 className="mb-2 text-lg text-gray-400">사업자 등록 번호</h3>
                <div className="flex items-center space-x-4"> {/* 사업자 등록번호 입력 필드 */}
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part1"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part1 ? 'border-red-500' : ''}`} // 유효하지 않을 시 빨간 테두리
                            />,
                            'part1' // part1 입력을 처리
                        )}
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part2"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part2 ? 'border-red-500' : ''}`} // 유효하지 않을 시 빨간 테두리
                            />,
                            'part2' // part2 입력을 처리
                        )}
                    </div>
                    <span>-</span>
                    <div className="flex-grow">
                        {renderInputWithOnChange(
                            <Input
                                type="text"
                                id="part3"
                                placeholder="Placeholder"
                                className={`${!isBusinessRegValid && !businessRegNum.part3 ? 'border-red-500' : ''}`} // 유효하지 않을 시 빨간 테두리
                            />,
                            'part3' // part3 입력을 처리
                        )}
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="조회하기"
                            type={BtnType.line}
                            onClick={validateBusinessReg} // 버튼 클릭 시 유효성 검사 및 API 호출
                        />
                    </div>
                </div>
                {!isBusinessRegValid && (
                    <p className="mt-1 text-sm text-red-500">사업자 등록 번호를 입력해주세요.</p> // 유효하지 않을 경우 경고 메시지 출력
                )}
                {apiResult && (
                    <p className="mt-2 text-sm text-gray-500">API 응답: {JSON.stringify(apiResult)}</p> // API 응답 결과 출력
                )}
            </div>

            <div className="mb-6"> {/* 사업자 이메일 입력 필드 */}
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

            <div className="mb-6"> {/* 사업자 전화번호 입력 필드 */}
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

            <div className="mb-6"> {/* 사업자 등록 주소 입력 필드 */}
                <h3 className="mb-2 text-lg text-gray-400">사업자 등록 주소</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Input type="text" id="address" placeholder="찾아보기...." />
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="찾아보기"
                            type={BtnType.line} // 주소 조회 버튼
                        />
                    </div>
                </div>
            </div>

            <div className="mb-6"> {/* 증빙서류 등록 입력 필드 */}
                <h3 className="mb-2 text-lg text-gray-400">증빙서류 등록</h3>
                <div className="flex items-center space-x-4">
                    <div className="flex-grow">
                        <Input type="text" id="document" placeholder="찾아보기...." />
                    </div>
                    <div className="w-[300px]">
                        <Button
                            size={BtnSize.m}
                            text="찾아보기"
                            type={BtnType.line} // 증빙서류 등록 버튼
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Documents; // 컴포넌트 export
