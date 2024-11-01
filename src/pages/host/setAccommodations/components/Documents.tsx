// 숙소 사업자등록증 컴포넌트
import { useState, cloneElement } from 'react';
import { Input } from '../../../../assets/Input';
import Button, { BtnSize, BtnType } from '../../../../assets/buttons/Button';
import axios from 'axios';

declare global {
  interface Window {
    daum: any;
  }
}

const Documents: React.FC = () => {
  const [businessRegNum, setBusinessRegNum] = useState({
    part1: '',
    part2: '',
    part3: '',
  });
  const [isBusinessRegValid, setIsBusinessRegValid] = useState(true);
  const [isBusinessVerified, setIsBusinessVerified] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('');
  const [phone1, setPhone1] = useState('');
  const [phone2, setPhone2] = useState('');
  const [phone3, setPhone3] = useState('');
  const [address, setAddress] = useState('');

  const VITE_DOCUMENT_API_URL = import.meta.env.VITE_DOCUMENT_API_URL;

  console.log(import.meta.env.VITE_DOCUMENT_API_URL);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    part: string
  ) => {
    const value = e.target.value;
    setBusinessRegNum({ ...businessRegNum, [part]: value });
  };

  const checkBusinessStatus = async () => {
    // setLoading(true);
    setError('');
    setIsBusinessVerified(false);

    const businessNumber = `${businessRegNum.part1}${businessRegNum.part2}${businessRegNum.part3}`;
    try {
      const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';
      const payload = { b_no: [businessNumber] };

      const response = await axios.post(
        `${url}?serviceKey=${VITE_DOCUMENT_API_URL}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      if (response.data.match_cnt > 0) {
        setIsBusinessVerified(true);
      } else {
        setError('사업자 번호를 확인하여 주세요.');
      }
    } catch (err) {
      setError('사업자 번호 조회에 실패했습니다.');
    } finally {
      //  setLoading(false);
    }
  };

  const validateBusinessReg = () => {
    const { part1, part2, part3 } = businessRegNum;
    if (!part1 || !part2 || !part3) {
      setIsBusinessRegValid(false);
    } else {
      setIsBusinessRegValid(true);
      checkBusinessStatus();
    }
  };

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        setAddress(data.address);
      },
    }).open();
  };

  const handlePhoneChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
    maxLength: number
  ) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setter(value);
    }
  };

  const renderInputWithOnChange = (
    element: JSX.Element,
    part: string,
    value: string
  ) => {
    return cloneElement(element, {
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        handleInputChange(e, part),
      value: value,
    });
  };

  return (
    <div className="p-6 bg-white border-none rounded-lg">
      <div className="mb-6">
        <h3 className="mb-2 text-lg text-gray-400">사업자 등록 번호</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            {renderInputWithOnChange(
              <Input
                type="text"
                id="part1"
                placeholder="Part 1"
                className={`${!isBusinessRegValid && !businessRegNum.part1 ? 'border-red-500' : ''}`}
              />,
              'part1',
              businessRegNum.part1
            )}
          </div>
          <span>-</span>
          <div className="flex-grow">
            {renderInputWithOnChange(
              <Input
                type="text"
                id="part2"
                placeholder="Part 2"
                className={`${!isBusinessRegValid && !businessRegNum.part2 ? 'border-red-500' : ''}`}
              />,
              'part2',
              businessRegNum.part2
            )}
          </div>
          <span>-</span>
          <div className="flex-grow">
            {renderInputWithOnChange(
              <Input
                type="text"
                id="part3"
                placeholder="Part 3"
                className={`${!isBusinessRegValid && !businessRegNum.part3 ? 'border-red-500' : ''}`}
              />,
              'part3',
              businessRegNum.part3
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
          <p className="mt-1 text-sm text-red-500">
            사업자 등록 번호를 입력해주세요.
          </p>
        )}
        {isBusinessVerified && (
          <p className="mt-1 text-sm text-green-500">
            사업자 등록번호가 확인되었습니다.
          </p>
        )}
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg text-gray-400">사업자 이메일</h3>
        <div className="flex items-center space-x-2">
          <div className="flex-grow">
            <Input
              type="text"
              id="email"
              placeholder="aaaaaa"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <span>@</span>
          <div className="flex-grow">
            <Input
              type="text"
              id="domain"
              placeholder="gmail.com"
              value={domain}
              onChange={e => setDomain(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg text-gray-400">사업자 전화번호</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <Input
              type="text"
              id="phone1"
              placeholder="010"
              value={phone1}
              onChange={e => handlePhoneChange(e, setPhone1, 3)}
            />
          </div>
          <span>-</span>
          <div className="flex-grow">
            <Input
              type="text"
              id="phone2"
              placeholder="1234"
              value={phone2}
              onChange={e => handlePhoneChange(e, setPhone2, 4)}
            />
          </div>
          <span>-</span>
          <div className="flex-grow">
            <Input
              type="text"
              id="phone3"
              placeholder="1234"
              value={phone3}
              onChange={e => handlePhoneChange(e, setPhone3, 4)}
            />
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-lg text-gray-400">사업자 등록 주소</h3>
        <div className="flex items-center space-x-4">
          <div className="flex-grow">
            <Input
              type="text"
              id="address"
              placeholder="찾아보기...."
              value={address}
              width="w-full"
              onChange={e => setAddress(e.target.value)}
            />
          </div>
          <div className="w-[300px]">
            <Button
              size={BtnSize.m}
              text="찾아보기"
              type={BtnType.line}
              onClick={handleAddressSearch}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
