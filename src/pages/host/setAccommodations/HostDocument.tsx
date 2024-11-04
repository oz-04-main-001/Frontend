import { useNavigate } from 'react-router-dom';
import Header from '../../../assets/Header';
import Button, { BtnSize, BtnType } from '../../../assets/buttons/Button';
import Arrow from '../../../assets/icons/arrow3.svg?react';
import Layout from '../../../layouts/Layout2';
import { FieldErrors, useForm } from 'react-hook-form';
import { postHostCreate } from '../../../axios/host';
import axios, { AxiosError } from 'axios';
import { useState } from 'react';

const VITE_DOCUMENT_API_KEY = import.meta.env.VITE_DOCUMENT_API_KEY;
interface BzImg {
  blob: Blob;
  fileName: string;
}
interface HostDocumentFormData {
  business_number: string[];
  business_email: string[];
  business_phonenumber: string[];
  business_address: string;
  business_document: BzImg;
}

export default function HostDocument() {
  const [isVerified, setIsVerified] = useState(false);
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm<HostDocumentFormData>({
    defaultValues: {
      business_number: ['317', '03', '46787'],
      business_email: ['kiseon', 'gmail.com'],
      business_phonenumber: ['010', '4810', '2606'],
      business_address: '서울 강남구 강남대로 328강남역 쉐르빌',
      business_document: null as unknown as BzImg,
    },
  });
  const bzNumber = watch('business_number');
  const bzEmail = watch('business_email');
  const phoneNumbers = watch('business_phonenumber');
  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        console.log(data);
        const address = data.address;
        const buildingName = data.buildingName || '';

        setValue('business_address', `${address} ${buildingName}`.trim());
      },
    }).open();
  };

  const checkBusinessStatus = async () => {
    const businessNumber = `${bzNumber[0]}${bzNumber[1]}${bzNumber[2]}`;
    console.log('Checking business status for:', businessNumber);

    setIsVerified(false);

    try {
      const url = 'https://api.odcloud.kr/api/nts-businessman/v1/status';
      const payload = { b_no: [businessNumber] };

      const response = await axios.post(
        `${url}?serviceKey=${VITE_DOCUMENT_API_KEY}`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
        }
      );

      console.log('API response:', response.data.data[0]);

      if (response.data.status_code === 'OK') {
        if (
          response.data.data[0].tax_type ===
          '국세청에 등록되지 않은 사업자등록번호입니다.'
        ) {
          setError('business_number', {
            type: 'manual',
            message: '국세청에 등록되지 않은 사업자등록번호입니다.',
          });
          return;
        } else {
          console.log('사업자 확인 완료');
          setIsVerified(true);
        }
      } else {
        setError('business_number', {
          type: 'manual',
          message: '사업자 번호를 확인하여 주세요.',
        });
      }
    } catch (err) {
      console.error('Error checking business status:', err);
      setError('business_number', {
        type: 'manual',
        message: '사업자 번호 조회에 실패했습니다.',
      });
    }
  };

  const onError = (errors: FieldErrors<HostDocumentFormData>) => {
    console.log('Form errors', errors);
  };
  const formData = new FormData();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSizeInMB = 3;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        setError('business_document', {
          type: 'manual',
          message: `파일 크기는 최대 ${maxSizeInMB}MB이어야 합니다.`,
        });
        return;
      }

      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = () => {
        const arrayBuffer = reader.result as ArrayBuffer;
        const blob = new Blob([arrayBuffer], { type: file.type });
        setValue('business_document', { blob, fileName: file.name });
        console.log('business_document', blob, file.name);
      };

      reader.onerror = error => {
        console.error('File read error:', error);
      };
    }
  };

  const onSubmit = async (data: HostDocumentFormData) => {
    formData.delete('business_number');
    formData.delete('business_email');
    formData.delete('business_phonenumber');
    formData.delete('business_address');
    // FormData에 데이터 추가
    formData.append('business_number', data.business_number.join('-')); // 배열을 문자열로 결합하여 추가
    formData.append('business_email', data.business_email.join('@'));
    formData.append(
      'business_phonenumber',
      data.business_phonenumber.join('-')
    );
    formData.append('business_address', data.business_address);
    formData.append(
      'business_document',
      data?.business_document.blob,
      data?.business_document.fileName
    );

    console.log('FormData content:', formData);

    try {
      const response = await postHostCreate(formData);
      console.log('Form data submitted successfully:', response);
      await navigate('/Host/SelectType');
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response) {
        console.error('Error response:', axiosError.response);
        const statusCode = axiosError.response.status;
        switch (statusCode) {
          case 401:
            navigate('/user/login');
            break;
          default:
            console.log('Request error');
            break;
        }
      } else {
        console.error('Unknown error:', err);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-11">
      <Header />
      <Layout>
        <div
          className="flex items-center justify-start gap-1 pt-24 cursor-pointer"
          onClick={() => navigate('/mypage')}
        >
          <Arrow width="24px" height="24px" />
          <h5>증빙서류 등록</h5>
        </div>
        <h3 className="my-9">증빙서류를 등록해주세요</h3>

        <form
          className="w-full p-5 text-gray-400 bg-white rounded-md"
          onSubmit={handleSubmit(onSubmit, onError)}
        >
          {/* 사업자 등록 번호 */}
          <label htmlFor="bzNumber">
            <h6>사업자 등록 번호</h6>
            <div className="flex gap-2">
              {bzNumber.map((_, index) => (
                <div key={index} className="flex items-center">
                  <input
                    type="text"
                    {...register(`business_number.${index}`, {
                      required: '필수 입력 항목입니다',
                    })}
                    placeholder={`Part ${index + 1}`}
                    className={`p-2 border rounded-md w-full ${
                      errors.business_number?.[index]
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-state-safe'
                    }`}
                  />
                  {index < bzNumber.length - 1 && (
                    <span className="px-2">-</span>
                  )}
                </div>
              ))}
              <Button
                size={BtnSize.l}
                text={isVerified ? '등록 완료' : '조회'}
                type={isVerified ? BtnType.disabled : BtnType.line}
                disabled={!isVerified}
                onClick={() => checkBusinessStatus()}
              />
            </div>
            {isVerified && (
              <p className="mt-1 text-sm text-green-500">
                사업자 등록이 확인되었습니다! 등록을 진행하세요.
              </p>
            )}
            {errors.business_number && !isVerified && (
              <p className="mt-1 text-sm text-red-500">
                {errors.business_number.message ||
                  '사업자 등록 번호를 입력해주세요'}
              </p>
            )}
          </label>

          {/* 사업자 이메일 */}
          <label htmlFor="business_email">
            <h6 className="mt-4">사업자 이메일</h6>
            <div className="flex gap-2">
              {bzEmail.map((_, index) => (
                <div key={index} className="flex items-center w-full">
                  <input
                    type="text"
                    {...register(`business_email.${index}`, {
                      required: '필수 입력 항목입니다',
                    })}
                    placeholder={index === 0 ? 'Email' : 'Domain'}
                    className={`p-2 border rounded-md w-full ${
                      errors.business_email?.[index]
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-state-safe'
                    }`}
                  />
                  {index < bzEmail.length - 1 && (
                    <span className="px-2">@</span>
                  )}
                </div>
              ))}
            </div>
            {errors.business_email && (
              <p className="mt-1 text-sm text-red-500">이메일을 입력해주세요</p>
            )}
          </label>

          {/* 사업자 전화번호 */}
          <label htmlFor="phoneNumbers">
            <h6 className="mt-4">사업자 전화번호</h6>
            <div className="flex gap-2">
              {phoneNumbers.map((_, index) => (
                <div key={index} className="flex items-center w-full">
                  <input
                    type="text"
                    {...register(`business_phonenumber.${index}`, {
                      required: '필수 입력 항목입니다',
                    })}
                    placeholder={`Part ${index + 1}`}
                    className={`p-2 border rounded-md w-full ${
                      errors.business_phonenumber?.[index]
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-gray-300 focus:ring-state-safe'
                    }`}
                  />
                  {index < phoneNumbers.length - 1 && (
                    <span className="px-2">-</span>
                  )}
                </div>
              ))}
            </div>
            {errors.business_phonenumber && (
              <p className="mt-1 text-sm text-red-500">
                전화번호를 입력해주세요
              </p>
            )}
          </label>

          {/* 등록주소 */}
          <label htmlFor="bzAddress">
            <h6 className="mt-4">등록주소</h6>
            <div className="flex gap-2">
              <input
                type="text"
                {...register('business_address', {
                  required: '주소를 입력해주세요',
                })}
                placeholder="찾아보기..."
                className={`w-full p-2 border rounded-md ${
                  errors.business_address
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-state-safe'
                }`}
              />
              <Button
                size={BtnSize.l}
                text="찾아보기"
                type={BtnType.line}
                onClick={() => {
                  handleAddressSearch();
                }}
              />
            </div>
            {errors.business_address && (
              <p className="mt-1 text-sm text-red-500">
                {errors.business_address.message}
              </p>
            )}
          </label>

          {/* 증빙서류 */}
          <label htmlFor="bzImg">
            <h6 className="mt-4">증빙서류</h6>
            <div className="flex gap-2">
              <input
                type="file"
                accept=".pdf"
                className={`w-full p-2 border rounded-md ${
                  errors.business_document
                    ? 'border-red-500 focus:ring-red-500'
                    : 'border-gray-300 focus:ring-state-safe'
                }`}
                onChange={handleFileUpload}
                required
              />
            </div>
            {errors.business_document && (
              <p className="mt-1 text-sm text-red-500">
                {errors.business_document.message}
              </p>
            )}
          </label>

          <Button
            size={BtnSize.l}
            text="등록"
            type={BtnType.submit}
            className="mt-8"
          />
        </form>
      </Layout>
    </div>
  );
}
